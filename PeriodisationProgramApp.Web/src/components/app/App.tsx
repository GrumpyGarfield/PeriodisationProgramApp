import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { auth } from "../common/authorization/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import UserService from "../../serverInteraction/services/UserService";

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      UserService.login();
    }
  }, [user]);

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
