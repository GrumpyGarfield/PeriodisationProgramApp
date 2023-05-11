import { Tabs, Tab, Box, Button, Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";
import React from "react";

export function TrainingProgramsPageHeader() {
  const [value, setValue] = React.useState("all");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="flex-end"
      justifyContent="space-between"
      sx={{ mb: 5 }}
    >
      <div>
        <PageHeader
          text="Training Programs"
          subtext="Browse and create your training programs"
        />
        <Box sx={{ flexGrow: 1, px: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="all" label="All" />
            <Tab value="created" label="Created" />
            <Tab value="saved" label="Saved" />
          </Tabs>
        </Box>
      </div>
      <Box sx={{ p: 3 }}>
        <Button variant="contained" color="secondary">
          Create New
        </Button>
      </Box>
    </Stack>
  );
}
