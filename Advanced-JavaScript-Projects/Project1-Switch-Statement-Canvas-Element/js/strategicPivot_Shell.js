/*  Strategic Pivot Open-Source Initiative
    Creator/Founder: Brandon Helm :: Contact at Phone: (651)-775-2272 or Email: brandon.helm@strategicpivot.com

    All parties have rights to use this code base to create whatever they wish; Please include me as a credit source in your code, and consider me for a job if you make something big happen with this before me!
************************************************************************************************/
// =============================================================================================
// MAIN CODE DEVELOPMENT SECTION FOR FLOWCHARTING BEHAVIOR =====================================
// =============================================================================================
// Set cube(s) textures and major properties near line 150 near... const cubes = [ {object}, {object), etc. ]
// Set line drawing points in pairs near line 642 near function... setLinePathsFromPoints (points pairs)
// Knowing the above 2 lines... you can code this to draw different interactive diagrams that modify display results on the main html page.
// =============================================================================================
// =============================================================================================
// Get the WebGL2 rendering context from our canvas element...
var canvas = document.getElementById('renderCanvas');
// Initialize the GL context; This prepares various WebGL2 state and functions for us to use.
gl = canvas.getContext("webgl2");
// Check if we have a valid context...
if (!gl) {
    console.error("WebGL2 is not available.");
}

// =============================================================================================
// Helper functions for texture loading and power-of-two checks
function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}
// Load a texture from a URL and return the WebGLTexture object
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Put a single white pixel as placeholder so texture can be used immediately
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, 1, 1, 0, srcFormat, srcType, new Uint8Array([255,255,255,255]));

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    } else {
      // Non-power-of-two: disable mipmaps and set wrapping to clamp-to-edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  };
  image.src = url;
  return texture;
}

// MAIN CODE DEVELOPMENT SECTION FOR FLOWCHARTING BEHAVIOR =====================================
// =============================================================================================
// Each cube can have an independent tint color (RGBA) which multiplies the sampled texture/color.
// Change the `color` array to tint the VAO per cube (e.g., [1,0,0,1] = full red tint).


// Utility to create a texture with text drawn on it
function createTextTexture(gl, text, options = {}) {
  const size = options.size || 256;
  const bgColor = options.bgColor || 'white';
  const textColor = options.textColor || 'black';
  const font = options.font || 'bold 32px Arial';

  // Create a canvas to draw text
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Draw wrapped text (centered)
  ctx.font = font;
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Calculate max line width (cube face width)
  const padding = 16;
  const maxLineWidth = size - 2 * padding;

  // Split text into words and wrap lines
  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  const lines = wrapText(ctx, text, maxLineWidth);
  const lineHeight = parseInt(font.match(/\d+/)) || 32;
  const totalTextHeight = lines.length * lineHeight;
  let y = size / 2 - totalTextHeight / 2 + lineHeight / 2;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], size / 2, y);
    y += lineHeight;
  }

  // Create WebGL texture (explicitly flip unpack so draw order is consistent)
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return texture;
}

// Utility to load text texture if no texture is set
function ensureCubeTexture(gl, cube) {
  if (!cube.texture) {
    cube.texture = createTextTexture(gl, cube.category || 'No Category');
  }
}

const cubes = [
  { texture: loadTexture(gl, 'images/gl_learningIcons/Genetics_SubjectIcon.jpg'), 
    translation: [-2, -2, 0], 
    color: [1.0, 0.0, 0.0, 1.0], 
    category: '0-Genetics' },
  { texture: loadTexture(gl, 'images/gl_learningIcons/Physics_SubjectIcon.jpg'), 
    translation: [ 0, 0, 0], 
    color: [0.0, 1.0, 0.0, 1.0], 
    category: '1-Physics' },
  { texture: loadTexture(gl, 'images/gl_learningIcons/Chemistry_SubjectIcon.jpg'), 
    translation: [ 2, -2, 0], 
    color: [0.0, 0.0, 1.0, 1.0], 
    category: '2-Chemistry' },
  { texture: loadTexture(gl, 'images/gl_learningIcons/Presentation_CourseIcon.jpg'), 
    translation: [ -2, 2, 0], 
    color: [1.0, 0.0, 1.0, 1.0], 
    category: '3-Physics > Presentation' },
  { texture: loadTexture(gl, 'images/gl_learningIcons/Article_CourseIcon.jpg'), 
    translation: [ 2, 2, 0], 
    color: [0.0, 1.0, 1.0, 1.0], 
    category: '4-Physics > Article' },
  { texture: loadTexture(gl, 'images/gl_learningIcons/Article_CourseIcon.jpg'), 
    translation: [ 5, 3, 0], 
    color: [.5, .5, .5, 1.0], 
    category: '5-Physics > Article' },
  {
    translation: [-5, 3, 0],
    color: [1.0, 0.647, 0.0, 1.0],
    category: '6-Digital Logic Long Subject Test' },
  {
    texture: loadTexture(gl, 'images/uploaded/SP_logo.PNG'), 
    translation: [-5, -3, 0],
    color: [1.0, 1.0, 1.0, 1.0],
    category: 'Strategic Pivot' },
];
// =============================================================================================
// =============================================================================================

// Global rotation state (applies the same rotation to every cube)
let globalAngle = 0.0; // radians
const globalRotationAxis = [0, 1, 0]; // default rotate around Y
let globalRotationSpeed = 1.0; // radians per second

// Swirl effect state
let swirl = {
  selectedIndex: -1,
  angle: 0,
  radius: 1.5,
  particles: []
};

// Initialize swirl particles
function initSwirl() {
  swirl.particles = [];
  for (let i = 0; i < 12; i++) {
    swirl.particles.push({
      angle: (i / 12) * Math.PI * 2,
      radius: 1.5,
      opacity: 1.0
    });
  }
}
initSwirl();

// Initial camera state and controls
const camera = {
  position: vec3.fromValues(0, 0, 10), // world-space eye position
  target: vec3.fromValues(0, 0, 0),   // world-space look-at target
  up: vec3.fromValues(0, 1, 0),
  lockTarget: true                     // when true, use lookAt to orient camera
};

// Helper functions exposed for quick control from console or other scripts
window.setCameraStart = function(x, y, z) {
  camera.position = vec3.fromValues(x, y, z);
};
window.setCameraTarget = function(x, y, z) {
  camera.target = vec3.fromValues(x, y, z);
};
window.setCameraLock = function(locked) {
  camera.lockTarget = !!locked;
};

// Draw the scene by rendering all cubes with their respective textures and colors
function drawScene(gl, programInfo, buffers) {

  gl.useProgram(programInfo.program);
  
  // Bind shared geometry (VAO)
  gl.bindVertexArray(buffers.vao);

  cubes.forEach((cube) => {
    ensureCubeTexture(gl, cube);
    // A. Update model matrix for this cube's position and apply the global rotation
    const modelMatrix = mat4.create();
    // Translate to cube position then rotate by the shared global angle
    mat4.translate(modelMatrix, modelMatrix, cube.translation);
    mat4.rotate(modelMatrix, modelMatrix, globalAngle, globalRotationAxis);
    gl.uniformMatrix4fv(programInfo.uModelMatrix, false, modelMatrix);

    // Set per-cube tint (uniform uColor). Falls back to white if not provided.
    const tint = cube.color || [1.0, 1.0, 1.0, 1.0];
    gl.uniform4fv(programInfo.uColor, tint);

    // B. Bind the specific texture for this cube
    gl.activeTexture(gl.TEXTURE0); // Set active unit
    gl.bindTexture(gl.TEXTURE_2D, cube.texture); // Bind texture object
    gl.uniform1i(programInfo.uSampler, 0); // Tell shader to use unit 0

    // C. Draw the cube
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  });
}
// =============================================================================================
// -------------------------------------------------------------
// Initialize shader program, populate programInfo and buffers
// -------------------------------------------------------------

// Load and compile a shader of the given type (vertex or fragment) from source
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Grab shader sources from the DOM and initialize the shader program
function initShaderProgramFromDOM(gl) {
  const vsSource = document.getElementById('vertexShader').textContent.trim();
  const fsSource = document.getElementById('fragmentShader').textContent.trim();

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
}


// Initialize the WebGL program and buffers
function init() {
  // Create and initialize the program and buffers
  const shaderProgram = initShaderProgramFromDOM(gl);
  if (!shaderProgram) {
    console.error('Shader program failed to initialize.');
    return;
  }

  const programInfo = {
    program: shaderProgram,
    // attribute locations
    position: gl.getAttribLocation(shaderProgram, 'position'),
    color: gl.getAttribLocation(shaderProgram, 'color'),
    textureCoord: gl.getAttribLocation(shaderProgram, 'textureCoord'),
    // uniform locations (exposed at top-level for drawScene convenience)
    uModelMatrix: gl.getUniformLocation(shaderProgram, 'modelMatrix'),
    uViewMatrix: gl.getUniformLocation(shaderProgram, 'viewMatrix'),
    uProjectionMatrix: gl.getUniformLocation(shaderProgram, 'projectionMatrix'),
    uSampler: gl.getUniformLocation(shaderProgram, 'uniformSampler'),
    uColor: gl.getUniformLocation(shaderProgram, 'uColor')
  }; 

  // Shared cube geometry (same data as used in other example)
  const positions = [
    // Front face
    -0.5, -0.5, -0.5, // bottom left
     0.5, -0.5, -0.5, // bottom right
     0.5,  0.5, -0.5, // top right
     0.5,  0.5, -0.5, // top right
    -0.5,  0.5, -0.5, // top left
    -0.5, -0.5, -0.5, // bottom left
    // Back face
    -0.5, -0.5,  0.5, // bottom left
     0.5, -0.5,  0.5, // bottom right
     0.5,  0.5,  0.5, // top right
     0.5,  0.5,  0.5, // top right
    -0.5,  0.5,  0.5, // top left
    -0.5, -0.5,  0.5, // bottom left
    // Left face
    -0.5,  0.5,  0.5, // top front
    -0.5,  0.5, -0.5, // top back
    -0.5, -0.5, -0.5, // bottom back
    -0.5, -0.5, -0.5, // bottom back
    -0.5, -0.5,  0.5, // bottom front
    -0.5,  0.5,  0.5, // top front
    // Right face
     0.5,  0.5,  0.5, // top front
     0.5,  0.5, -0.5, // top back
     0.5, -0.5, -0.5, // bottom back
     0.5, -0.5, -0.5, // bottom back
     0.5, -0.5,  0.5, // bottom front
     0.5,  0.5,  0.5, // top front
    // Bottom face
    -0.5, -0.5, -0.5, // left back
     0.5, -0.5, -0.5, // right back
     0.5, -0.5,  0.5, // right front
     0.5, -0.5,  0.5, // right front
    -0.5, -0.5,  0.5, // left front
    -0.5, -0.5, -0.5, // left back
    // Top face
    -0.5,  0.5, -0.5, // left back
     0.5,  0.5, -0.5, // right back
     0.5,  0.5,  0.5, // right front
     0.5,  0.5,  0.5, // right front
    -0.5,  0.5,  0.5, // left front
    -0.5,  0.5, -0.5  // left back
  ];

  const textureCoordinates = [
    // Front face --> Corrected
    1.0, 0.0, // bottom left
    0.0, 0.0, // bottom right
    0.0, 1.0, // top right
    0.0, 1.0, // top right
    1.0, 1.0, // top left
    1.0, 0.0, // bottom left
    // Back face --> Corrected
    0.0, 0.0, // bottom left
    1.0, 0.0, // bottom right
    1.0, 1.0, // top right
    1.0, 1.0, // top right
    0.0, 1.0, // top left
    0.0, 0.0, // bottom left
    // Left face --> Corrected
    1.0, 1.0, // top front --> top left
    0.0, 1.0, // top back --> top right
    0.0, 0.0, // bottom back --> bottom right
    0.0, 0.0, // bottom back --> bottom right
    1.0, 0.0, // bottom front --> bottom left
    1.0, 1.0, // top front --> top left
    // Right face --> Corrected
    0.0, 1.0, // top front --> top left
    1.0, 1.0, // top back --> top right
    1.0, 0.0, // bottom back --> bottom right
    1.0, 0.0, // bottom back --> bottom right
    0.0, 0.0, // bottom front --> bottom left
    0.0, 1.0, // top front --> top left
    // Bottom face --> Corrected
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    // Top face --> Mirrored vertically
    1.0, 0.0, // left back
    0.0, 0.0, // right back
    0.0, 1.0, // right front
    0.0, 1.0, // right front
    1.0, 1.0, // left front
    1.0, 0.0  // left back
  ];

  // simple white colors so textures appear with original colors
  const colors = [];
  for (let i = 0; i < 36; i++) {
    colors.push(1.0, 1.0, 1.0, 1.0);
  }

  // Create index buffer
  const indices = new Uint16Array(Array.from({length: 36}, (_, i) => i));

  // Create VAO and buffers
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  // Position buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  if (programInfo.position !== -1) {
    gl.enableVertexAttribArray(programInfo.position);
    gl.vertexAttribPointer(programInfo.position, 3, gl.FLOAT, false, 0, 0);
  }

  // Color buffer
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  if (programInfo.color !== -1) {
    gl.enableVertexAttribArray(programInfo.color);
    gl.vertexAttribPointer(programInfo.color, 4, gl.FLOAT, false, 0, 0);
  }

  // Texture coord buffer
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  if (programInfo.textureCoord !== -1) {
    gl.enableVertexAttribArray(programInfo.textureCoord);
    gl.vertexAttribPointer(programInfo.textureCoord, 2, gl.FLOAT, false, 0, 0);
  }

  // Element array buffer
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  // Unbind VAO
  gl.bindVertexArray(null);

  // =============================================================================================
  // -----------------------------------------
  // Line program: draw a gold line between the cubes
  // -----------------------------------------
  // Simple line shaders (transform positions with view/projection)
  const lineVertexSource = `#version 300 es
  in vec3 position;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
  }
  `;

  const lineFragmentSource = `#version 300 es
  precision mediump float;
  uniform vec4 uLineColor;
  out vec4 finalColor;
  void main() {
    finalColor = uLineColor;
  }
  `;

  // Compile and link line program
  const vLineShader = loadShader(gl, gl.VERTEX_SHADER, lineVertexSource);
  const fLineShader = loadShader(gl, gl.FRAGMENT_SHADER, lineFragmentSource);
  const lineProgram = gl.createProgram();
  gl.attachShader(lineProgram, vLineShader);
  gl.attachShader(lineProgram, fLineShader);
  gl.linkProgram(lineProgram);
  if (!gl.getProgramParameter(lineProgram, gl.LINK_STATUS)) {
    console.error('Unable to link line shader program: ' + gl.getProgramInfoLog(lineProgram));
  }

  const lineInfo = {
    program: lineProgram,
    attribPosition: gl.getAttribLocation(lineProgram, 'position'),
    uViewMatrix: gl.getUniformLocation(lineProgram, 'viewMatrix'),
    uProjectionMatrix: gl.getUniformLocation(lineProgram, 'projectionMatrix'),
    uLineColor: gl.getUniformLocation(lineProgram, 'uLineColor')
  };

  // VAO & buffer for the line
  const lineVAO = gl.createVertexArray();
  gl.bindVertexArray(lineVAO);
  const lineBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
  // allocate empty buffer initially
  gl.bufferData(gl.ARRAY_BUFFER, 3 * 3 * Float32Array.BYTES_PER_ELEMENT, gl.DYNAMIC_DRAW);
  if (lineInfo.attribPosition !== -1) {
    gl.enableVertexAttribArray(lineInfo.attribPosition);
    gl.vertexAttribPointer(lineInfo.attribPosition, 3, gl.FLOAT, false, 0, 0);
  }
  gl.bindVertexArray(null);

  // Line specification helpers - supports defining points as cube indices (resolved each frame),
  // explicit world-space points, or multiple line paths (array of point arrays)
  let lineSpec = { mode: 'cubes', indices: [0, 1, 2] };

  // UNUSED --> Set the line to connect cubes by index (e.g. [0,2,4])
  function setLineCubes(indices) {
    lineSpec = { mode: 'cubes', indices: indices.slice() };
    updateLineVertices();
  }
  window.setLineCubes = setLineCubes;

  // UNUSED --> Set the line to use explicit world points: [[x,y,z], ...]
  function setLinePoints(points) {
    lineSpec = { mode: 'points', points: points.map(p => [p[0], p[1], p[2]]) };
    updateLineVertices();
  }
  window.setLinePoints = setLinePoints;

  // IN-USE --> Set multiple line paths from an array of point arrays: [[[x,y,z], ...], [[x,y,z], ...], ...]
  function setLinePathsFromPoints(pathArray) {
    lineSpec = { mode: 'paths', paths: pathArray.map(path => path.map(p => [p[0], p[1], p[2]])) };
    updateLineVertices();
  }
  window.setLinePathsFromPoints = setLinePathsFromPoints;

  // UNUSED --> Set multiple line paths from cube indices: [[cubeIdx1, cubeIdx2], [cubeIdx3, cubeIdx4], ...]
  function setLinePathsFromCubes(cubeIndexPaths) {
    lineSpec = { mode: 'cubePaths', cubePaths: cubeIndexPaths.map(path => path.slice()) };
    updateLineVertices();
  }
  window.setLinePathsFromCubes = setLinePathsFromCubes;

  // =============================================================================================

  // Resolve the current line points into world-space positions, applying cube transforms
  function resolveLinePoints() {
    if (!lineSpec) return [];
    
    if (lineSpec.mode === 'points') {
      return lineSpec.points.slice();
    }
    
    if (lineSpec.mode === 'cubes') {
      const out = [];
      for (let i = 0; i < lineSpec.indices.length; i++) {
        const idx = lineSpec.indices[i];
        if (idx < 0 || idx >= cubes.length) continue;
        const model = mat4.create();
        mat4.translate(model, model, cubes[idx].translation);
        mat4.rotate(model, model, globalAngle, globalRotationAxis);
        const p = vec4.fromValues(0, 0, 0, 1.0);
        vec4.transformMat4(p, p, model);
        out.push([p[0], p[1], p[2]]);
      }
      return out;
    }
    
    if (lineSpec.mode === 'paths') {
      // Return array of paths (not flattened) so we can process each path separately
      return lineSpec.paths.map(path => path.map(p => [p[0], p[1], p[2]]));
    }
    
    if (lineSpec.mode === 'cubePaths') {
      // Resolve cube indices to world positions for each path
      const out = [];
      for (let pathIdx = 0; pathIdx < lineSpec.cubePaths.length; pathIdx++) {
        const cubePath = lineSpec.cubePaths[pathIdx];
        for (let i = 0; i < cubePath.length; i++) {
          const idx = cubePath[i];
          if (idx < 0 || idx >= cubes.length) continue;
          const model = mat4.create();
          mat4.translate(model, model, cubes[idx].translation);
          mat4.rotate(model, model, globalAngle, globalRotationAxis);
          const p = vec4.fromValues(0, 0, 0, 1.0);
          vec4.transformMat4(p, p, model);
          out.push([p[0], p[1], p[2]]);
        }
        // Add a degenerate point to break the line strip between paths
        if (pathIdx < lineSpec.cubePaths.length - 1) {
          const lastPath = lineSpec.cubePaths[pathIdx];
          const lastIdx = lastPath[lastPath.length - 1];
          if (lastIdx >= 0 && lastIdx < cubes.length) {
            const model = mat4.create();
            mat4.translate(model, model, cubes[lastIdx].translation);
            mat4.rotate(model, model, globalAngle, globalRotationAxis);
            const p = vec4.fromValues(0, 0, 0, 1.0);
            vec4.transformMat4(p, p, model);
            out.push([p[0], p[1], p[2]]);
          }
        }
      }
      return out;
    }
    
    return [];
  }
  // =============================================================================================

  // Update GPU buffer from resolved line points (called each frame before drawing fallback thin lines)
  function updateLineVertices() {
    const pts = resolveLinePoints();
    if (!pts || pts.length < 2) {
      // clear buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, 0, gl.DYNAMIC_DRAW);
      return;
    }

    const verts = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      verts[i*3 + 0] = pts[i][0];
      verts[i*3 + 1] = pts[i][1];
      verts[i*3 + 2] = pts[i][2];
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW);
  }

  // Initialize the buffer for the default lineSpec
  updateLineVertices();

  // MAIN CODE DEVELOPMENT SECTION FOR FLOWCHARTING BEHAVIOR =====================================
  // =============================================================================================
  // Draw lines between any 2 points (5 separate paths)
  // I couldn't get around the bug with line functions connecting all points together...
  // So I have to build my line drawing in a specific sequence to make sure I don't draw an extra unintended line.
  setLinePathsFromPoints([
    [cubes[1].translation, cubes[3].translation],
    [cubes[1].translation, cubes[4].translation],
    [cubes[4].translation, cubes[5].translation],
    [cubes[1].translation, cubes[2].translation],
    [cubes[1].translation, cubes[0].translation],
    [cubes[3].translation, cubes[6].translation],
    [cubes[0].translation, cubes[7].translation]
  ]);
  // =============================================================================================
  // =============================================================================================

  // Gold color
  const goldColor = [1.0, 0.843, 0.0, 1.0];

  // Line thickness default and optional UI hookup
  let currentThicknessPx = 4;
  const thicknessInput = document.getElementById('lineThickness');
  const thicknessValueSpan = document.getElementById('lineThicknessValue');
  if (thicknessInput) {
    currentThicknessPx = parseFloat(thicknessInput.value) || currentThicknessPx;
    if (thicknessValueSpan) thicknessValueSpan.textContent = thicknessInput.value;
    thicknessInput.addEventListener('input', (e) => {
      currentThicknessPx = parseFloat(e.target.value) || currentThicknessPx;
      if (thicknessValueSpan) thicknessValueSpan.textContent = e.target.value;
    });
  }

  // Selected object display
  const selectedObjDiv = document.getElementById('selectedObject');

  // =============================================================================================
  // ------------
  // Thick line renderer (screen-space triangulation)
  // ------------
  const thickVertexSource = `#version 300 es
  in vec3 position; // NDC positions
  void main() { gl_Position = vec4(position, 1.0); }
  `;

  const thickFragmentSource = `#version 300 es
  precision mediump float;
  uniform vec4 uLineColor;
  out vec4 finalColor;
  void main() { finalColor = uLineColor; }
  `;

  const vThick = loadShader(gl, gl.VERTEX_SHADER, thickVertexSource);
  const fThick = loadShader(gl, gl.FRAGMENT_SHADER, thickFragmentSource);
  const thickProgram = gl.createProgram();
  gl.attachShader(thickProgram, vThick);
  gl.attachShader(thickProgram, fThick);
  gl.linkProgram(thickProgram);
  if (!gl.getProgramParameter(thickProgram, gl.LINK_STATUS)) console.error('Unable to link thick line program: ' + gl.getProgramInfoLog(thickProgram));

  const thickInfo = {
    program: thickProgram,
    attribPosition: gl.getAttribLocation(thickProgram, 'position'),
    uLineColor: gl.getUniformLocation(thickProgram, 'uLineColor')
  };

  const thickVAO = gl.createVertexArray();
  gl.bindVertexArray(thickVAO);
  const thickBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, thickBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 4 * 3 * Float32Array.BYTES_PER_ELEMENT, gl.DYNAMIC_DRAW);
  if (thickInfo.attribPosition !== -1) {
    gl.enableVertexAttribArray(thickInfo.attribPosition);
    gl.vertexAttribPointer(thickInfo.attribPosition, 3, gl.FLOAT, false, 0, 0);
  }
  gl.bindVertexArray(null);

  function buildThickLineTriangles(worldPoints, thicknessPx, viewMat, projMat, canvas) {
    if (!worldPoints || worldPoints.length < 2) return null;
    const verts = [];
    for (let i = 0; i < worldPoints.length - 1; i++) {
      const pA = worldPoints[i];
      const pB = worldPoints[i+1];
      
      // Skip degenerate segments (identical points used to break line paths)
      const dx_world = pB[0] - pA[0];
      const dy_world = pB[1] - pA[1];
      const dz_world = pB[2] - pA[2];
      if (Math.hypot(dx_world, dy_world, dz_world) < 1e-6) continue;
      
      const a4 = vec4.fromValues(pA[0], pA[1], pA[2], 1.0);
      const b4 = vec4.fromValues(pB[0], pB[1], pB[2], 1.0);
      vec4.transformMat4(a4, a4, viewMat);
      vec4.transformMat4(a4, a4, projMat);
      vec4.transformMat4(b4, b4, viewMat);
      vec4.transformMat4(b4, b4, projMat);
      if (Math.abs(a4[3]) < 1e-6 || Math.abs(b4[3]) < 1e-6) continue;
      const aN = [a4[0] / a4[3], a4[1] / a4[3], a4[2] / a4[3]];
      const bN = [b4[0] / b4[3], b4[1] / b4[3], b4[2] / b4[3]];
      const ax = (aN[0] * 0.5 + 0.5) * canvas.width;
      const ay = (aN[1] * 0.5 + 0.5) * canvas.height;
      const bx = (bN[0] * 0.5 + 0.5) * canvas.width;
      const by = (bN[1] * 0.5 + 0.5) * canvas.height;
      let dx = bx - ax; let dy = by - ay;
      const len = Math.hypot(dx, dy);
      if (len < 1e-3) continue;
      dx /= len; dy /= len;
      const px = -dy; const py = dx;
      const half = thicknessPx * 0.5;
      const offx = px * half; const offy = py * half;
      const s1p = [ax + offx, ay + offy, aN[2]];
      const s1m = [ax - offx, ay - offy, aN[2]];
      const s2p = [bx + offx, by + offy, bN[2]];
      const s2m = [bx - offx, by - offy, bN[2]];
      function screenToNDC(sx, sy) { return [(sx / canvas.width) * 2 - 1, (sy / canvas.height) * 2 - 1]; }
      const n1p = screenToNDC(s1p[0], s1p[1]);
      const n1m = screenToNDC(s1m[0], s1m[1]);
      const n2p = screenToNDC(s2p[0], s2p[1]);
      const n2m = screenToNDC(s2m[0], s2m[1]);
      verts.push(n1p[0], n1p[1], s1p[2]);
      verts.push(n1m[0], n1m[1], s1m[2]);
      verts.push(n2p[0], n2p[1], s2p[2]);
      verts.push(n2p[0], n2p[1], s2p[2]);
      verts.push(n1m[0], n1m[1], s1m[2]);
      verts.push(n2m[0], n2m[1], s2m[2]);
    }
    if (verts.length === 0) return null;
    return new Float32Array(verts);
  }

  // GL state
  gl.enable(gl.DEPTH_TEST);

  // =============================================================================================

  // -------------------------
  // Raycaster (mouse picking)
  // -------------------------
  function unprojectNDCToWorld(ndcX, ndcY, ndcZ, invViewProj) {
    const v = vec4.fromValues(ndcX, ndcY, ndcZ, 1.0);
    vec4.transformMat4(v, v, invViewProj);
    if (Math.abs(v[3]) < 1e-6) return null;
    return [v[0] / v[3], v[1] / v[3], v[2] / v[3]];
  }

  function intersectRayUnitCube(rayOrigin, rayDir, modelMatrix) {
    const invModel = mat4.create();
    if (!mat4.invert(invModel, modelMatrix)) return { hit: false };

    const o4 = vec4.fromValues(rayOrigin[0], rayOrigin[1], rayOrigin[2], 1.0);
    const p4 = vec4.fromValues(rayOrigin[0] + rayDir[0], rayOrigin[1] + rayDir[1], rayOrigin[2] + rayDir[2], 1.0);
    vec4.transformMat4(o4, o4, invModel);
    vec4.transformMat4(p4, p4, invModel);
    const o = [o4[0] / o4[3], o4[1] / o4[3], o4[2] / o4[3]];
    const p = [p4[0] / p4[3], p4[1] / p4[3], p4[2] / p4[3]];
    const d = [p[0] - o[0], p[1] - o[1], p[2] - o[2]];
    let len = Math.hypot(d[0], d[1], d[2]);
    if (len === 0) return { hit: false };
    d[0] /= len; d[1] /= len; d[2] /= len;

    // Unit cube AABB in object-local space: [-0.5, 0.5]
    let tMin = -Infinity;
    let tMax = Infinity;
    const bounds = [[-0.5, 0.5], [-0.5, 0.5], [-0.5, 0.5]];

    for (let i = 0; i < 3; i++) {
      const originComp = o[i];
      const dirComp = d[i];
      const minB = bounds[i][0];
      const maxB = bounds[i][1];
      if (Math.abs(dirComp) < 1e-8) {
        if (originComp < minB || originComp > maxB) return { hit: false };
      } else {
        let t1 = (minB - originComp) / dirComp;
        let t2 = (maxB - originComp) / dirComp;
        if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
        if (t1 > tMin) tMin = t1;
        if (t2 < tMax) tMax = t2;
        if (tMin > tMax) return { hit: false };
      }
    }

    if (tMax < 0) return { hit: false };
    const tHit = tMin >= 0 ? tMin : tMax;
    return { hit: true, t: tHit };
  }

  let selectedIndex = -1;

  function pickAt(clientX, clientY) {
    // build view/projection (same as used in rendering)
    const viewMatrix = mat4.create();
    if (camera.lockTarget) {
      mat4.lookAt(viewMatrix, camera.position, camera.target, camera.up);
    } else {
      // Use a plain translation if target lock is disabled (keeps the camera orientation fixed)
      mat4.translate(viewMatrix, viewMatrix, [-camera.position[0], -camera.position[1], -camera.position[2]]);
    }
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvas.width / canvas.height, 0.1, 100.0);
    const viewProj = mat4.create();
    mat4.mul(viewProj, projectionMatrix, viewMatrix);
    const invVP = mat4.create();
    if (!mat4.invert(invVP, viewProj)) return -1;

    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    const ndcX = (px / canvas.width) * 2 - 1;
    const ndcY = ((canvas.height - py) / canvas.height) * 2 - 1;

    const near = unprojectNDCToWorld(ndcX, ndcY, -1, invVP);
    const far = unprojectNDCToWorld(ndcX, ndcY, 1, invVP);
    if (!near || !far) return -1;

    const rayOrig = near;
    const rayDir = vec3.create();
    vec3.subtract(rayDir, far, near);
    vec3.normalize(rayDir, rayDir);

    let nearestT = Infinity; let nearestIdx = -1;
    cubes.forEach((cube, idx) => {
      const model = mat4.create();
      mat4.translate(model, model, cube.translation);
      mat4.rotate(model, model, globalAngle, globalRotationAxis);
      const r = intersectRayUnitCube(rayOrig, rayDir, model);
      if (r.hit && r.t < nearestT) { nearestT = r.t; nearestIdx = idx; }
    });

    return nearestIdx;
  }

  // Helper function to detect what's under the cursor without changing selection
  function getHoveredObject(clientX, clientY) {
    const viewProj = mat4.create();
    mat4.multiply(viewProj, projectionMatrix, viewMatrix);

    const invVP = mat4.create();
    if (!mat4.invert(invVP, viewProj)) return -1;

    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    const ndcX = (px / canvas.width) * 2 - 1;
    const ndcY = ((canvas.height - py) / canvas.height) * 2 - 1;

    const near = unprojectNDCToWorld(ndcX, ndcY, -1, invVP);
    const far = unprojectNDCToWorld(ndcX, ndcY, 1, invVP);
    if (!near || !far) return -1;

    const rayOrig = near;
    const rayDir = vec3.create();
    vec3.subtract(rayDir, far, near);
    vec3.normalize(rayDir, rayDir);

    let nearestT = Infinity; let nearestIdx = -1;
    cubes.forEach((cube, idx) => {
      const model = mat4.create();
      mat4.translate(model, model, cube.translation);
      mat4.rotate(model, model, globalAngle, globalRotationAxis);
      const r = intersectRayUnitCube(rayOrig, rayDir, model);
      if (r.hit && r.t < nearestT) { nearestT = r.t; nearestIdx = idx; }
    });

    return nearestIdx;
  }

  canvas.addEventListener('click', (e) => {
    const idx = pickAt(e.clientX, e.clientY);
    if (idx !== -1) {
      console.log('Selected cube', idx);
      const category = cubes[idx].category || 'Unknown';
      if (selectedObjDiv) selectedObjDiv.textContent = 'Selected: ' + category;
      // Update camera target to center on selected cube
      const c = cubes[idx];
      vec3.set(camera.target, c.translation[0], c.translation[1], c.translation[2]);
      // Position camera at same x,y as target, keeping z distance
      camera.position[0] = camera.target[0];
      camera.position[1] = camera.target[1];
      
      // Update selection visual with highlighting and swirl
      if (selectedIndex !== -1) {
        const prev = cubes[selectedIndex];
        if (prev._baseColor) prev.color = prev._baseColor.slice();
      }
      selectedIndex = idx;
      swirl.selectedIndex = idx;
      swirl.angle = 0;
      const c2 = cubes[idx];
      if (!c2._baseColor) c2._baseColor = c2.color.slice();
      c2.color = [1.0, 1.0, 0.25, 1.0]; // highlight yellow
    } else {
      console.log('No selection');
      if (selectedObjDiv) selectedObjDiv.textContent = 'Selected: none';
      // Reset camera target when deselected (only on click)
      vec3.set(camera.target, 0, 0, 0);
      // Position camera at origin x,y, keeping z distance
      camera.position[0] = 0;
      camera.position[1] = 0;
      
      // Clear selection visual
      if (selectedIndex !== -1) {
        const prev = cubes[selectedIndex];
        if (prev._baseColor) prev.color = prev._baseColor.slice();
      }
      selectedIndex = -1;
      swirl.selectedIndex = -1;
    }
  });

  // Change cursor on hover (without affecting selection)
  canvas.addEventListener('mousemove', (e) => {
    const idx = getHoveredObject(e.clientX, e.clientY);
    canvas.style.cursor = idx !== -1 ? 'pointer' : 'default';
  });

  // Camera interaction: wheel to zoom only
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const dir = vec3.create();
    vec3.subtract(dir, camera.position, camera.target);
    const len = vec3.length(dir);
    vec3.normalize(dir, dir);
    const delta = e.deltaY * 0.01;
    const newLen = Math.max(1.0, len + delta);
    vec3.scale(dir, dir, newLen);
    vec3.add(camera.position, camera.target, dir);
  });

  // =============================================================================================

  // Swirl rendering function - creates animated spiral effect
  function drawSwirl(viewMat, projMat) {
    if (swirl.selectedIndex < 0 || swirl.selectedIndex >= cubes.length) return;
    
    const selectedCube = cubes[swirl.selectedIndex];
    const swirlCenterWorld = [selectedCube.translation[0], selectedCube.translation[1], selectedCube.translation[2] - 1.5];
    
    // Create spiral point arrays for each ring
    const rings = 3;
    const pointsPerRing = 32;
    
    for (let r = 0; r < rings; r++) {
      const baseRadius = 0.8 + r * 0.4;
      const rotationOffset = swirl.angle + r * 0.6;
      const spiralPoints = [];
      for (let p = 0; p <= pointsPerRing; p++) {
        const angle = (p / pointsPerRing) * Math.PI * 2 + rotationOffset;
        // Sinusoidal wave effect on radius
        const wave = 0.18 * Math.sin(angle * 2 + swirl.angle * 2 + r);
        const radiusAtPoint = baseRadius + wave;
        const x = swirlCenterWorld[0] + Math.cos(angle) * radiusAtPoint;
        const y = swirlCenterWorld[1] + Math.sin(angle) * radiusAtPoint;
        const z = swirlCenterWorld[2] + Math.sin(angle * 3 + swirl.angle * 2) * 0.2;
        spiralPoints.push([x, y, z]);
      }
      
      // Build thick line triangles for the spiral ring
      const swirlTriVerts = buildThickLineTriangles(spiralPoints, 2.5 + r * 0.8, viewMat, projMat, canvas);
      
      if (swirlTriVerts && swirlTriVerts.length > 0) {
        gl.useProgram(thickInfo.program);
        gl.bindVertexArray(thickVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, thickBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, swirlTriVerts, gl.DYNAMIC_DRAW);
        
        // Cyan/blue swirl color with fading effect
        const fadeOut = Math.max(0, 1.0 - r * 0.35);
        const intensity = 0.5 + Math.sin(swirl.angle * 3 + r) * 0.3;
        gl.uniform4fv(thickInfo.uLineColor, [0.2 * fadeOut, 0.7 * fadeOut * intensity, 0.9 * fadeOut * intensity, 0.6 * fadeOut]);
        gl.drawArrays(gl.TRIANGLES, 0, swirlTriVerts.length / 3);
        gl.bindVertexArray(null);
      }
    }
    
    // Update swirl animation --> Controls swirl speed.
    swirl.angle += 0.04;
  }

  // Use a CSS gradient background on the canvas and make the clear color transparent
  // so the gradient shows through where fragments are not drawn or are transparent.
  canvas.style.background = 'linear-gradient(to bottom, #10303e, #4b8b7b)';
  gl.clearColor(0.0, 0.0, 0.0, 0.0);

  // Track time for smooth rotation updates
  let lastTime = 0;

  // Render loop
  function render(now) {
    // compute delta time in seconds and advance the shared angle
    const nowSec = now * 0.001;
    const deltaTime = nowSec - lastTime;
    lastTime = nowSec;
    globalAngle += globalRotationSpeed * deltaTime;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // simple camera matrices
    const viewMatrix = mat4.create();
    if (camera.lockTarget) {
      mat4.lookAt(viewMatrix, camera.position, camera.target, camera.up);
    } else {
      // If not locking target, use a translation based on camera.position (keeps orientation fixed)
      mat4.translate(viewMatrix, viewMatrix, [-camera.position[0], -camera.position[1], -camera.position[2]]);
    }
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvas.width / canvas.height, 0.1, 100.0);

    // Set program and common uniforms
    gl.useProgram(programInfo.program);
    gl.bindVertexArray(vao);
    gl.uniformMatrix4fv(programInfo.uViewMatrix, false, viewMatrix);
    gl.uniformMatrix4fv(programInfo.uProjectionMatrix, false, projectionMatrix);

    // Draw swirl effect behind selected object
    drawSwirl(viewMatrix, projectionMatrix);

    // Call drawScene which will set model matrix, bind cube-specific texture and draw
    drawScene(gl, programInfo, { vao: vao });

    // Resolve line points (cube indices or explicit points) in world space and render thick lines in screen space
    const resolvedLinePoints = resolveLinePoints();
    
    // Handle both single path (array of points) and multiple paths (array of arrays)
    const isMultiplePaths = resolvedLinePoints.length > 0 && Array.isArray(resolvedLinePoints[0][0]);
    
    if (isMultiplePaths) {
      // Process each path separately to avoid connecting them
      for (const pathPoints of resolvedLinePoints) {
        const triVerts = buildThickLineTriangles(pathPoints, currentThicknessPx, viewMatrix, projectionMatrix, canvas);
        if (triVerts && triVerts.length > 0) {
          gl.useProgram(thickInfo.program);
          gl.bindVertexArray(thickVAO);
          gl.bindBuffer(gl.ARRAY_BUFFER, thickBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, triVerts, gl.DYNAMIC_DRAW);
          gl.uniform4fv(thickInfo.uLineColor, goldColor);
          gl.drawArrays(gl.TRIANGLES, 0, triVerts.length / 3);
          gl.bindVertexArray(null);
        }
      }
    } else {
      // Single path
      const triVerts = buildThickLineTriangles(resolvedLinePoints, currentThicknessPx, viewMatrix, projectionMatrix, canvas);
      if (triVerts && triVerts.length > 0) {
        gl.useProgram(thickInfo.program);
        gl.bindVertexArray(thickVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, thickBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, triVerts, gl.DYNAMIC_DRAW);
        gl.uniform4fv(thickInfo.uLineColor, goldColor);
        gl.drawArrays(gl.TRIANGLES, 0, triVerts.length / 3);
        gl.bindVertexArray(null);
      } else {
        // fallback to thin GL lines
        updateLineVertices();
        const count = resolvedLinePoints ? resolvedLinePoints.length : 0;
        gl.useProgram(lineInfo.program);
        gl.bindVertexArray(lineVAO);
        gl.uniformMatrix4fv(lineInfo.uViewMatrix, false, viewMatrix);
        gl.uniformMatrix4fv(lineInfo.uProjectionMatrix, false, projectionMatrix);
        gl.uniform4fv(lineInfo.uLineColor, goldColor);
        if (count > 0) gl.drawArrays(gl.LINES, 0, count);
        gl.bindVertexArray(null);
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// =============================================================================================
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}