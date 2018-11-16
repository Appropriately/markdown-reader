// Set the options for the showdown markdown convertor
function setOptions() {
  showdown.setFlavor('github');
} // setOptions

function test() {
  setOptions();
  var markdownFileLocation = 'markdown/index.md';
  var converter = new showdown.Converter();
  
  $.ajax({
    url: markdownFileLocation,
    type: 'get',
    dataType: 'html',
    async: true,
    success: function(data) {
      $("#markdown-here").html(converter.makeHtml(data));
    }
  });
} // test()
