import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { auth } from "../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header user={user} loading={loading} />
      <Sidebar />
      {loading ? null : <Outlet />}
    </Box>
  );
}

export default App;
