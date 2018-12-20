// Javascript here will just be really simple expansions of the main.js, which
// would look kind of out of place there

// Toggles the left menu
function toggleMenu() {
  $('#navigator').toggle();
} // toggleMenu


function renderIndex() {
  loadMarkdownFromFile(APPLICATION_FOLDER + '/index.md');
} // renderIndex


function renderReadme() {
  loadMarkdownFromFile(APPLICATION_FOLDER + '/README.md');
} // renderReadme


// A shorthand function for loading markdown from a file
function load(currentFilePath) {
  loadMarkdownFromFile(currentFilePath);
} //load