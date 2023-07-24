import { Button, Link, Typography } from "@mui/material";
import { PageContent } from "../components/common/pageContent/PageContent";
import { PageContentItem } from "../components/common/pageContent/PageContentItem";
import { PageHeader } from "../components/common/pageHeader/PageHeader";
import { SingInOrSignUpModal } from "../components/common/modal/SingInOrSignUpModal";
import useAuthentication from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { SimpleCard } from "../components/common/card/SimpleCard";

export function HomePage() {
  const { isUserAuthenticated } = useAuthentication();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProgram = () => {
    isUserAuthenticated
      ? navigate("/training-programs/create")
      : setIsModalOpen(true);
  };

  const handleCreateExercise = () => {
    isUserAuthenticated ? navigate("/exercises/create") : setIsModalOpen(true);
  };

  return (
    <PageContent>
      <PageHeader
        text="Welcome to Periodisation Program App"
        subtext="Science based workout generator"
      />
      <PageContentItem>
        <SimpleCard>
          <Link
            component={RouterLink}
            to="training-programs"
            variant="h5"
            underline="hover"
          >
            Training Programs
          </Link>
          <Typography sx={{ pt: 3 }}>
            <Link component={RouterLink} to="training-programs">
              Browse
            </Link>{" "}
            and{" "}
            <Link onClick={handleCreateProgram} sx={{ cursor: "pointer" }}>
              create
            </Link>{" "}
            your training programs
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateProgram}
            sx={{ position: "absolute", top: 0, right: 0, m: 3 }}
          >
            Create New
          </Button>
        </SimpleCard>
      </PageContentItem>
      <PageContentItem>
        <SimpleCard>
          <Link
            component={RouterLink}
            to="exercises"
            variant="h5"
            underline="hover"
          >
            Exercises
          </Link>
          <Typography sx={{ pt: 3 }}>
            <Link component={RouterLink} to="exercises">
              Browse
            </Link>{" "}
            and{" "}
            <Link onClick={handleCreateExercise} sx={{ cursor: "pointer" }}>
              create
            </Link>{" "}
            your exercises
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateExercise}
            sx={{ position: "absolute", top: 0, right: 0, m: 3 }}
          >
            Create New
          </Button>
        </SimpleCard>
      </PageContentItem>
      <PageContentItem>
        <SimpleCard>
          <Link
            component={RouterLink}
            to="muscle-groups"
            variant="h5"
            underline="hover"
          >
            Muscle Groups
          </Link>
          <Typography sx={{ pt: 3 }}>
            <Link component={RouterLink} to="muscle-groups">
              Browse
            </Link>{" "}
            and edit muscle groups info
          </Typography>
        </SimpleCard>
      </PageContentItem>
      <SingInOrSignUpModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </PageContent>
  );
}
