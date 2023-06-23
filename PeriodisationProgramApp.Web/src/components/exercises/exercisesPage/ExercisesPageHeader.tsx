import { Tabs, Tab, Box, Button, Stack } from "@mui/material";
import { PageHeader } from "../../../components/common/pageHeader/PageHeader";
import React, { useState } from "react";
import useExercises from "../../../context/entityContext/entities/exercise/useExercises";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";
import { SingInOrSignUpModal } from "../../common/modal/SingInOrSignUpModal";

export function ExercisesPageHeader() {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useAuthentication();
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
  const { setOptionalParams } = useExercises();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreate = () => {
    isUserAuthenticated ? navigate("create") : setIsModalOpen(true);
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
          text="Exercises"
          subtext="Browse and create your exercises"
        />
        {isUserAuthenticated ? (
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
      <Button variant="contained" color="secondary" onClick={handleCreate}>
        Create New
      </Button>
      <SingInOrSignUpModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
}
