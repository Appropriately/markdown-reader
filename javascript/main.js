// Set the options for the showdown markdown convertor
function setOptions() {
  showdown.setFlavor('github');
} // setOptions

// Given a files location, load that file and update the html
function loadMarkdownFromFile(file) {
  setOptions();
  var converter = new showdown.Converter();

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
