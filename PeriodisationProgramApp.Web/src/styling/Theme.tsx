import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#101112",
    },
    secondary: {
      main: "#ee2d37",
    },
  },
};

export const theme = createTheme(themeOptions);
