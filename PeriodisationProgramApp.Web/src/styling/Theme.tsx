import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#222f39",
    },
    secondary: {
      main: "#ee2d37",
    },
  },
  typography: {
    h1: {
      fontSize: "4.6rem",
    },
    fontSize: 14,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1680,
    },
  },
};

export const theme = createTheme(themeOptions);
