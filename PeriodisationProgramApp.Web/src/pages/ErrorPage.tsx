import { Box, CssBaseline } from "@mui/material";
import { PageContent } from "../components/common/pageContent/PageContent";
import { PageHeader } from "../components/common/pageHeader/PageHeader";
import { PageTitle } from "../components/common/pageTitle/PageTitle";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Firebase";

export function ErrorPage() {
  const [user, loading] = useAuthState(auth);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header user={user} loading={loading} />
      <Sidebar />
      <PageTitle title="Page Not Found" />
      <PageContent>
        <PageHeader
          text="Page not found"
          subtext="This page does not exist or no longer available."
        />
      </PageContent>
    </Box>
  );
}
