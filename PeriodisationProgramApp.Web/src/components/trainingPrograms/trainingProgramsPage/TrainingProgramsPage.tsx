import { Stack, Box, Container, Toolbar } from "@mui/material";
import { TrainingProgramsPageHeader } from "./TrainingProgramsPageHeader";
import TrainingProgramsList from "./TrainingProgramsList";
import TrainingProgramsSort from "./TrainingProgramsSort";
import TrainingProgramsFilterSidebar from "./TrainingProgramsFilterSidebar";
import TrainingProgramsSearch from "./TrainingProgramsSearch";
import { EntityProvider } from "../../../context/EntityContextProvider";

export function TrainingProgramsPage() {
  return (
    <EntityProvider>
      <Container
        sx={{ margin: 0, p: 2 }}
        maxWidth={false}
        disableGutters={true}
      >
        <Toolbar />
        <TrainingProgramsPageHeader />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 5 }}
          >
            <TrainingProgramsSearch />
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <TrainingProgramsFilterSidebar />
              <TrainingProgramsSort />
            </Stack>
          </Stack>
          <TrainingProgramsList />
        </Box>
      </Container>
    </EntityProvider>
  );
}
