import { Box, Card, Link, Typography, Stack, Divider } from "@mui/material";
import { TrainingProgram } from "./TrainingProgramProps";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  trainingProgram: TrainingProgram;
};

export default function TrainingProgramsCard({ trainingProgram }: Props) {
  const [raised, setRaised] = React.useState(false);

  return (
    <Card
      raised={raised}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          color="inherit"
          underline="hover"
          component={RouterLink}
          to={trainingProgram.id}
        >
          <Typography variant="h5" noWrap>
            {trainingProgram.name}
          </Typography>
        </Link>

        <Stack spacing={1} sx={{ pw: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {trainingProgram.type}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {trainingProgram.numberOfSessions} weekly sessions
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {trainingProgram.trainingLevels.map((trainingLevel) => (
              <Typography variant="subtitle2">{trainingLevel}</Typography>
            ))}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            {trainingProgram.description}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
