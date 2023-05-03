import { Stack, Box, Container, Toolbar } from "@mui/material";
import { TrainingProgramsPageHeader } from "./TrainingProgramsPageHeader";
import TrainingProgramsList from "./TrainingProgramsList";
import TrainingProgramsSort from "./TrainingProgramsSort";
import TrainingProgramsFilterSidebar from "./TrainingProgramsFilterSidebar";
import { useState } from "react";
import TrainingProgramsSearch from "./TrainingProgramsSearch";
import React from "react";

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
        <TrainingProgramsList />
      </Box>
    </Container>
  );
}
