function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
}
// readyState Values                            |   status Values (HTTP Status Codes - Over 60 exist; Few are needed for basic AJAX)
// 0: request not initialized                   |   200: "OK"
// 1: server connection established             |   404: "Not Found"
// 2: request received                          |   500: "Internal Server Error"
// 3: processing request                        |   150: "Processing"
// 4: request finished and response is ready    |   203: "Non-Authoritative Information"
