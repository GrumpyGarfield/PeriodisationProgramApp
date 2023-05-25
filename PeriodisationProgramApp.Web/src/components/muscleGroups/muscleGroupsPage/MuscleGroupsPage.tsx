import { Box, Container, Toolbar } from "@mui/material";
import { EntityProvider } from "../../../context/entityContext/EntityContextProvider";
import { MuscleGroupsPageHeader } from "./MuscleGroupsPageHeader";
import MuscleGroupsList from "./MuscleGroupsList";
export function MuscleGroupsPage() {
  return (
    <EntityProvider>
      <Container
        sx={{ margin: 0, p: 2 }}
        maxWidth={false}
        disableGutters={true}
      >
        <Toolbar />
        <MuscleGroupsPageHeader />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <MuscleGroupsList />
        </Box>
      </Container>
    </EntityProvider>
  );
}
