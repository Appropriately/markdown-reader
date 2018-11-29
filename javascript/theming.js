/* Handles theming */

/* Define the themes here */
// THEME_NAME = [--main-bg-colour, --additional-bg-colour, --navbar-bg-colour,
//  --main-text-colour, --main-text-colour, --code-bg-colour,
//  --code-border-colour, --highlight-colour]
LIGHT_THEME = ['white', 'lightgray',
  'linear-gradient(124deg, rgba(52,58,64,1) 0%, rgba(82,82,82,1) 100%)',
  'black', '#444444', '#f8f8f8', '#dfdfdf', '#999999'
];
DARK_THEME = ['#222222', '#333333',
  'linear-gradient(124deg, rgba(52,58,64,1) 0%, rgba(82,82,82,1) 100%)',
  'white', 'lightgray', '#111111', 'black', '#555555'
];


function isDarkTheme() {
  if ($(":root").css("--main-bg-colour") === 'white') return false;
  else return true;
} // isDarkTheme


// Toggles between LIGHT_THEME and DARK_THEME
function toggleDarkMode() {
  var darkModeToggler = $("#dark-mode-toggler");
  darkModeToggler.removeClass('fa-check-square fa-square');
  if (isDarkTheme()) {
    // Currently set to the dark theme
    setTheme(LIGHT_THEME);
    darkModeToggler.addClass("fa-square");
    localStorage.setItem("THEME", 'LIGHT');
  } else {
    setTheme(DARK_THEME);
    darkModeToggler.addClass("fa-check-square");
    localStorage.setItem("THEME", 'DARK');
  } // if
} // toggleDarkMode


// Ensure that the settings display the right information
function checkSettings() {
  // Check if in dark mode, if so set the appropriate value
  alert('test');
} // checkSettings


// Given some function of the correct format, set the theme
function setTheme(theme) {
  $(":root").css("--main-bg-colour", theme[0]);
  $(":root").css("--additional-bg-colour", theme[1]);
  $(":root").css("--navbar-bg-colour", theme[2]);
  $(":root").css("--main-text-colour", theme[3]);
  $(":root").css("--accent-colour", theme[4]);
  $(":root").css("--code-bg-colour", theme[5]);
  $(":root").css("--code-border-colour", theme[6]);
  $(":root").css("--highlight-colour", theme[7]);
} // setTheme