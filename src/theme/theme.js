import { createTheme } from "@mui/material/styles";

// Light theme
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#A0D0D0",
      secondary: "green",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#A0D0D0",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export { lightTheme, darkTheme };