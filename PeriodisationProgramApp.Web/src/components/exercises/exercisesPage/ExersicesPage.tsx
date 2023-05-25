import { Stack, Box, Container, Toolbar } from "@mui/material";
import { EntityProvider } from "../../../context/entityContext/EntityContextProvider";
import { ExercisesPageHeader } from "./ExercisesPageHeader";
import ExercisesSearch from "./ExercisesSearch";
import ExercisesFilterSidebar from "./ExercisesFilterSidebar";
import ExercisesSort from "./ExercisesSort";
import ExercisesList from "./ExercisesList";

export function ExercisesPage() {
  return (
    <EntityProvider>
      <Container
        sx={{ margin: 0, p: 2 }}
        maxWidth={false}
        disableGutters={true}
      >
        <Toolbar />
        <ExercisesPageHeader />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 5 }}
          >
            <ExercisesSearch />
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ExercisesFilterSidebar />
              <ExercisesSort />
            </Stack>
          </Stack>
          <ExercisesList />
        </Box>
      </Container>
    </EntityProvider>
  );
}
