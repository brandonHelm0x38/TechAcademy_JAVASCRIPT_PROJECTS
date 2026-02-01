// Function to display character name using custom data attribute
function displayType(character) {
    var characterName = character.getAttribute('data-character-name');
    alert(characterName + " is in the " + character.innerHTML + " universe!");
}