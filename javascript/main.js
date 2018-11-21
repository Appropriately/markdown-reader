var HTML_DIV_LAYER = '<div class="layer mx-2"></div>';
var ROOT_FOLDER = 'markdown';
var HUMAN_SIZES = ['B', 'kB', 'MB', 'GB', 'TB'];


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
  root.append("<span class='folder'><i class='fas fa-folder'></i> " +
    json['directory'] + "</span>");

  // Handle adding all the files
  $.each(json['files'], function(index, value) {
    to_append = "<a href='javascript:loadMarkdownFromFile(\"" +
      value['full_path'] + "\");' role='button' class='document'>" +
      value['file'] + "</a>";

    root.append(to_append);
  });

  // Handle adding more directories
  if (json.hasOwnProperty('directories')) {
    // Recurisvely call for each one!
    $.each(json['directories'], function(index, value) {
      root.append("<div style='height:15px;'></div>")
      if (json.hasOwnProperty('files')) appendFolder(value, root);
    });
  } // if
} // appendFolder


// Build the navigation menu, by making recursive calls
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


// When given some path and a jsonObject, return the json associated with that
// path. Will be used to search for information about a file.
function findFullPathInJSON(jsonObject, filePathStructure, originalPath) {
  currentValue = filePathStructure.shift();

  if (currentValue.endsWith('.md')) {
    if (jsonObject.hasOwnProperty('files')) {
      returnedFile = null;

      $.each(jsonObject['files'], function(index, file) {
        // Check if any of the file is the right one
        var hasProperty = file.hasOwnProperty('full_path');
        if (hasProperty && file['full_path'] === originalPath) {
          returnedFile = file;
          return false; // Leave $.each
        } // if
      });

      return returnedFile;
    } // if files in folder

    return null;
  } else {
    if (currentValue === ROOT_FOLDER) {
      return findFullPathInJSON(jsonObject, filePathStructure, originalPath);
    } // Checking if it is the root

    if (jsonObject.hasOwnProperty('directories')) {
      returnedFile = null;

      $.each(jsonObject['directories'], function(index, directory) {
        var foundDirectoryValue = directory['directory'].toLowerCase();
        if (foundDirectoryValue === currentValue.toLowerCase())
          returnedFile =
          findFullPathInJSON(directory, filePathStructure, originalPath);
        return false; // Leave $.each
      });

      return returnedFile;
    } // if it has directories

    return null;
  } // if
} // findFullPathInJSON


// Given a file path, build out the information panel. It will need to take
// a full file path, search for the associated json object and retrieve the
// information from it.
function buildInformationPanel(filePath) {
  var informationPanel = $("#information-panel");
  var information = $("#information");

  filePathStructure = filePath.split('/');

  function handleError() {
    errorMessage = 'There was a problem getting ' + filePathStructure.pop() +
      "'s information."
    appendAlert('warning', errorMessage);
    informationPanel.hide();
  } // handleError

  // Function which returns a nice string for use with the information panel
  function info(icon, title, data) {
    return "<span class='section'><i class='fas fa-" + icon + "'></i> " + title +
      ": " + data + "</span>";
  } // info

  // Taken from https://stackoverflow.com/a/20732091
  // Converts bytes to a more human readable filesize.
  function humanFileSize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + HUMAN_SIZES[i];
  }; // humanFileSize

  // Retrieve file
  $.ajax({
    url: 'data.json',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(json) {
      var result = findFullPathInJSON(json, filePathStructure, filePath);
      if (result === null) handleError();
      else {
        information.empty();

        // Guaranteed information
        information.append(info('info-circle', 'Name', result['file']));
        information.append(info('folder', 'Path', result['full_path']));

        // Optional information
        if (result.hasOwnProperty('author'))
          information.append(info('file-signature', 'Author',
            result['author']));
        if (result.hasOwnProperty('size'))
          information.append(info('weight', 'File size',
            humanFileSize(result['size'])));
        if (result.hasOwnProperty('description'))
          information.append(info('pen', 'Description',
            result['description']));

        // Show the finished panel
        informationPanel.show();
      } // else
    },
    error: function() {
      handleError();
    }
  });
} // buildInformation


// Appends an alert to the page when called.
// Some common alertTypes include success, danger, warning & info
function appendAlert(alertType, message) {
  $("#alerts").append(
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


function handleBadLink(link) {
  appendAlert("danger", "The link " + link + " doesn't exist!");
  renderIndex(); // Default to the index page.
} // handleBadLink


// Given a files location, load that file and update the html
function loadMarkdownFromFile(currentFilePath, checkInformation = true) {
  setOptions();
  var converter = new showdown.Converter();

  // Check currentFilePath has been specified
  if (currentFilePath === '') {
    alert("No file specified");
  } // if

  $.ajax({
    url: currentFilePath,
    type: 'get',
    dataType: 'html',
    async: true,
    success: function(data) {
      // Ensure that there is actually data there
      if (data === null) handleBadLink(currentFilePath);

      // Get the name of the file
      var name = currentFilePath.split('/').pop();

      // Setup the page to change
      var newTitle = "Markdown Reader - " + name;
      var newPage = window.location.pathname + '?page=' + currentFilePath;
      $(document).attr("title", newTitle);
      window.history.pushState(name, newTitle, newPage);

      // Build the information pannel
      if (checkInformation === true) buildInformationPanel(currentFilePath);
      else $('#information-panel').hide();

      $("#markdown").html(converter.makeHtml(data));
    },
    error: function() {
      // Handle if there is an issue with the requested page
      handleBadLink(currentFilePath);
    }
  });
} // loadMarkdownFromFile
