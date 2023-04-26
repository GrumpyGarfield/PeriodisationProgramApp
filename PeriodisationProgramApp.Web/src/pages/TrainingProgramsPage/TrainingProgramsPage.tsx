import { Stack, Box, Container, Toolbar } from "@mui/material";
import { TrainingProgramsPageHeader } from "./TrainingProgramsPageHeader";
import TrainingProgramsList from "./TrainingProgramsList";
import TrainingProgramsSort from "./TrainingProgramsSort";
import { TrainingProgram } from "./TrainingProgramProps";
import TrainingProgramsFilterSidebar from "./TrainingProgramsFilterSidebar";
import { useState } from "react";
import TrainingProgramsSearch from "./TrainingProgramsSearch";
import React from "react";

const trainingPrograms: TrainingProgram[] = [
  {
    id: "0",
    name: "Program1",
    description: "Description1",
    type: "Upper/Lower",
    numberOfSessions: 4,
    trainingLevels: ["Beginner", "Intermediate"],
  },
  {
    id: "1",
    name: "Program2",
    description: "Description2",
    type: "Push/Pull/Legs",
    numberOfSessions: 6,
    trainingLevels: ["Intermediate", "Advanced"],
  },
  {
    id: "2",
    name: "Program3",
    description: "Description3",
    type: "Full Body",
    numberOfSessions: 3,
    trainingLevels: ["Beginner"],
  },
];

export function TrainingProgramsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterName, setFilterName] = useState("");

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setPage(0);
    setFilterName(event.target.value);
  };

  return (
    <Container sx={{ margin: 0, p: 2 }} maxWidth={false} disableGutters={true}>
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
          <TrainingProgramsSearch
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <TrainingProgramsFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <TrainingProgramsSort />
          </Stack>
        </Stack>

        <TrainingProgramsList trainingPrograms={trainingPrograms} />
      </Box>
    </Container>
  );
}
