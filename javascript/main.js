// Function that will handle the site being loaded
function onPageLoad() {
  // Check for URL params
  var url = new URL(window.location.href);
  var page = url.searchParams.get("page");

  // Check if there are any URL params
  if (page === null) {
    renderIndex();
  } else if (page.slice(-2) !== 'md') {
    appendAlert("danger", "The file is not the correct format.");
    renderIndex();
  } else {
    loadMarkdownFromFile(page);
  } // if
} // onPageLoad

// Appends an alert to the page when called.
// Some common alertTypes include success, danger, warning & info
function appendAlert(alertType, message) {
  $( "#alerts" ).append(
    "<div class='alert alert-" + alertType +
    " alert-dismissible fade show' role='alert'>" + message +
    "<button type='button' class='close' data-dismiss='alert' " +
    "aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
  );
} // appendAlert

// Set the options for the showdown markdown convertor
function setOptions() {
  showdown.setFlavor('github');
} // setOptions

function renderIndex() {
  loadMarkdownFromFile('markdown/index.md');
}

function handleBadLink(link) {
  appendAlert("danger", "The link " + link + " doesn't exist!");
  renderIndex(); // Default to the index page.
} // handleBadLink

// Given a files location, load that file and update the html
function loadMarkdownFromFile(file) {
  setOptions();
  var converter = new showdown.Converter();

  // Check file has been specified
  if(file === '') {
    alert("No file specified");
  } // if

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
