var HTML_DIV_LAYER = '<div class="layer mx-2"></div>';

// Function that will handle the site being loaded
function onPageLoad() {
  // Check for URL params
  var url = new URL(window.location.href);
  var page = url.searchParams.get("page");

  buildNavigation();

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

function appendFolder(json, parent) {
  // Append layer
  root = parent.append(HTML_DIV_LAYER).children("div:last-child");

  // Add the folder name and icon
  root.append("<span class='folder lead'><i class='fas fa-folder'></i> " +
    json['directory'] + "</span>");

  // Handle adding all the files
  $.each(json['files'], function(index, value) {
    to_append = "<a href='javascript:loadMarkdownFromFile(\"" +
      value['full_path'] + "\");' role='button' class='document'>" +
      value['file'] + "</a>";

    root.append(to_append);
  });

  // Handle adding more directories
  if ( json.hasOwnProperty('directories') ) {
    // Recurisvely call for each one!
    $.each(json['directories'], function(index, value) {
      if ( json.hasOwnProperty('files') ) appendFolder(value, root);
    });
  } // if

} // appendFolder

function buildNavigation() {
  // Retrieve file
  $.ajax({
    url: 'data.json',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(json) {
      var root = $("#navigation");
      root.html("");
      appendFolder(json, root);
    },
    error: function() {
      // Handle if there is an issue with the requested page
      appendAlert('danger', 'There was a problem reading the folder.');
      $("#navigation").append("<h4>Something was wrong :(</h4>");
    }
  });
} // buildNavigation

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

      // Get the name of the file
      var name = file.split('/').pop();
      $(document).attr("title", "Markdown Reader - " + name);

      $("#markdown").html(converter.makeHtml(data));
    },
    error: function() {
      // Handle if there is an issue with the requested page
      handleBadLink(file);
    }
  });
} // test()
