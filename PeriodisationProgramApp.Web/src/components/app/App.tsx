import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { auth } from "../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AlertProvider } from "../../context/alertContext/AlertContextProvider";
import { AlertSnackbar } from "../common/snackbar/AlertSnackbar";
import { LoaderProvider } from "../../context/loaderContext/LoaderContextProvider";
import { LoaderModal } from "../common/modal/LoaderModal";

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <LoaderProvider>
      <AlertProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header user={user} loading={loading} />
          <Sidebar />
          {loading ? null : <Outlet />}
          <AlertSnackbar />
        </Box>
        <LoaderModal />
      </AlertProvider>
    </LoaderProvider>
  );
}

export default App;
