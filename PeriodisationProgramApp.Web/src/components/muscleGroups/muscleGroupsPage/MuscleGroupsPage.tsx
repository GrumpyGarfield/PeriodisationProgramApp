import { Box, Container, Toolbar } from "@mui/material";
import { MuscleGroupsPageHeader } from "./MuscleGroupsPageHeader";
import MuscleGroupsList from "./MuscleGroupsList";
export function MuscleGroupsPage() {
  return (
    <Container sx={{ margin: 0, p: 2 }} maxWidth={false} disableGutters={true}>
      <Toolbar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <MuscleGroupsPageHeader />
        <MuscleGroupsList />
      </Box>
    </Container>
  );
}
