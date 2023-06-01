import { Tabs, Tab, Box, Button, Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";
import React from "react";
import { auth } from "../../../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useExercises from "../../../context/entityContext/entities/useExercises";

export function ExercisesPageHeader() {
  const [value, setValue] = React.useState("all");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    if (newValue === "all") {
      setOptionalParams({});
    }

    if (newValue === "created") {
      setOptionalParams({ isCreated: true });
    }

    if (newValue === "liked") {
      setOptionalParams({ isLiked: true });
    }
  };
  const [user] = useAuthState(auth);
  const { setOptionalParams } = useExercises();

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
          text="Exercises"
          subtext="Browse and create your exercises"
        />
        {user !== null && user !== undefined ? (
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
              <Tab value="liked" label="Liked" />
            </Tabs>
          </Box>
        ) : null}
      </div>
      <Button variant="contained" color="secondary">
        Create New
      </Button>
    </Stack>
  );
}
