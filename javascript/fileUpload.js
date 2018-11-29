/* Scripts which handle all file uploading and managing files */

const ACCEPTED_FILE_EXTENSIONS = ['md', 'txt'];

function handleBadFile(reason) {
    if (reason === '') {
        appendAlert("danger", "There was a problem with the file.");
    } else {
        appendAlert('danger', reason);
    }
    renderIndex(); // Default to the index page.
} //handleBadFile


function triggerUpload() {
    $("#upload:hidden").trigger('click');
} // triggerUpload


// Add an event handler to the upload, that perform an action when a file 
// is uploaded.
$(document).on('change', '#upload', function () {
    // Setup the convertor
    setOptions();
    var converter = new showdown.Converter({ extensions: ['showdown-toc'] });

    // Get the file
    var file = $('#upload').prop('files')[0];

    // Perform some checks
    // Check if a file was uploaded
    if (!file) {
        return;
    } // if

    var extension = file.name.split('.').pop();

    if (!ACCEPTED_FILE_EXTENSIONS.includes(extension.toLowerCase())) {
        handleBadFile(
            'Sorry, but the extension "' + extension + '" is not supported.'
        );
        return;
    }

    // Setup the page to change
    var newTitle = "Markdown Reader - " + file.name;
    var newPage = window.location.pathname;
    $(document).attr("title", newTitle);
    window.history.pushState(file.name, newTitle, newPage);

    // Handle the information panel
    $('#information-panel').hide();

    const reader = new FileReader();
    reader.onload = event => $("#markdown").html(converter.makeHtml(event.target.result));
    reader.onerror = error => handleBadFile();
    reader.readAsText(file);
});