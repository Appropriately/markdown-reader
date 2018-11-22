/* Handles theming */

/* Define the themes here */
// THEME_NAME = [--main-bg-colour, --additional-bg-colour, --navbar-bg-colour,
//  --main-text-colour, --main-text-colour, --code-bg-colour,
//  --code-border-colour, --highlight-colour]
LIGHT_THEME = ['white', 'lightgray',
  'linear-gradient(124deg, rgba(52,58,64,1) 0%, rgba(82,82,82,1) 100%)',
  'black', '#444444', '#f8f8f8', '#dfdfdf', '#999999'];
DARK_THEME = ['#222222', '#333333',
  'linear-gradient(124deg, rgba(52,58,64,1) 0%, rgba(82,82,82,1) 100%)',
  'white', 'lightgray', '#111111', 'black', '#555555'];


function setDarkTheme() {
  setTheme(DARK_THEME);
} // setDarkTheme


function setLightTheme() {
  setTheme(LIGHT_THEME);
} // setLightTheme


// Given some function of the correct format, set the theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--main-bg-colour", theme[0]);
  document.documentElement.style.setProperty("--additional-bg-colour", theme[1]);
  document.documentElement.style.setProperty("--navbar-bg-colour", theme[2]);
  document.documentElement.style.setProperty("--main-text-colour", theme[3]);
  document.documentElement.style.setProperty("--accent-colour", theme[4]);
  document.documentElement.style.setProperty("--code-bg-colour", theme[5]);
  document.documentElement.style.setProperty("--code-border-colour", theme[6]);
  document.documentElement.style.setProperty("--highlight-colour", theme[7]);
} // setTheme
