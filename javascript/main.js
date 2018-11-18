// Function that will handle the site being loaded
function onPageLoad() {
  // Check for URL params
  var url = new URL(window.location.href);
  var page = url.searchParams.get("page");

  // Check if there are any URL params
  if (page === null || page.slice(-2) !== 'md') {
    renderIndex();
  } else {
    loadMarkdownFromFile(page);
  }

} // onPageLoad

// Set the options for the showdown markdown convertor
function setOptions() {
  showdown.setFlavor('github');
} // setOptions

function renderIndex() {
  loadMarkdownFromFile('markdown/index.md');
}

function handleBadLink(link) {
  alert("What the hell is " + link); // TODO: Make this give a page alert instead
  renderIndex(); // Default to the index page.
} // handleBadLink

// Given a files location, load that file and update the html
function loadMarkdownFromFile(file) {
  setOptions();
  var converter = new showdown.Converter();

  // Check file has been specified
  if(file === '') {
    alert("No file specified");
  }

  $.ajax({
    url: file,
    type: 'get',
    dataType: 'html',
    async: true,
    success: function(data) {
      // Ensure that there is actually data there
      if(data === null) handleBadLink(file);

      $("#markdown").html(converter.makeHtml(data));
    },
    error: function() {
      // Handle if there is an issue with the requested page
      handleBadLink(file);
    }
  });
} // test()
