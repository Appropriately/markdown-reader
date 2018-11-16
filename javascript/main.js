// Get text from a specific url
function getText(myUrl) {
  var result = null;
  $.ajax({
    url: myUrl,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  FileReady = true;
  return result;
} // getText()

// Set the options for the showdown markdown convertor
function setOptions() {
  showdown.setFlavor('github');
} // setOptions

function test() {
  setOptions();
  var markdownFileLocation = 'markdown/index.md';
  var converter = new showdown.Converter();
  var md = getText(markdownFileLocation);
  $("#markdown-here").html(converter.makeHtml(md));
} // test()
