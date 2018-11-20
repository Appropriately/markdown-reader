// Javascript here will just be really simple expansions of the main.js

// Toggles the left menu
function toggleMenu() {
  $('#navigator').toggle();
} // toggleMenu


function renderIndex() {
  loadMarkdownFromFile(ROOT_FOLDER + '/index.md');
} // renderIndex


function renderReadme() {
  loadMarkdownFromFile('README.md', false);
} // renderReadme
