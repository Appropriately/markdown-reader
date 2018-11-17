// Set the options for the showdown markdown convertor
function setOptions() {
  showdown.setFlavor('github');
} // setOptions

function renderIndex() {
  loadMarkdownFromFile('markdown/index.md');
}

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
      $("#markdown").html(converter.makeHtml(data));
    }
  });
} // test()
