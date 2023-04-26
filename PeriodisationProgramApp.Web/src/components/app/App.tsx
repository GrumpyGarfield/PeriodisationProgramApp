import { Header } from "../Header";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "../../styling/Theme";
import { Sidebar } from "../sidebar/Sidebar";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
