import { Card, Grid, Typography } from "@mui/material";
import { TrainingSession } from "../../../types/enitities/TrainingSession";
import { TrainingProgramPageSession } from "./TrainingProgramPageSession";
import React, { useEffect } from "react";
import Scrollbar from "../../common/scrollbar/Scrollbar";
import useTrainingSchedule from "../../../context/trainingScheduleContext/useTrainingSchedule";
import { Loader } from "../../common/loader/Loader";

type Props = {
  sessions: TrainingSession[];
  numberOfSessions: number;
  handleChange?: (...event: any[]) => void;
  isEditMode?: boolean;
};

export function TrainingProgramPageSchedule({
  sessions,
  numberOfSessions,
  handleChange,
  isEditMode,
}: Props) {
  const { setIsEditMode } = useTrainingSchedule();

  const updateSession = (updatedTrainingSession: TrainingSession) => {
    sessions = sessions.map((trainingSession) =>
      trainingSession.id === updatedTrainingSession.id
        ? updatedTrainingSession
        : trainingSession
    );
    handleChange && handleChange(sessions);
  };

  useEffect(() => {
    setIsEditMode(isEditMode ? isEditMode : false);
  });

  if (sessions === undefined) {
    return <Loader />;
  }

  const weeks = [
    ...new Set(
      sessions
        .sort((a, b) => (a.week > b.week ? 1 : -1))
        .map((trainingSession) => trainingSession.week)
    ),
  ];

  return (
    <Card sx={{ height: "768px", overflow: "hidden" }}>
      <Scrollbar>
        <Grid container spacing={2} columns={numberOfSessions} sx={{ p: 3 }}>
          {weeks.map((week) => {
            return (
              <React.Fragment key={week}>
                <Grid item xs={numberOfSessions}>
                  <Typography
                    variant="h5"
                    sx={{ textAlign: "center", py: 3 }}
                  >{`Week ${week} (${
                    sessions.find(
                      (trainingSession) => trainingSession.week === week
                    )?.repsInReserve
                  } RIR)`}</Typography>
                </Grid>
                {sessions
                  .filter((trainingSession) => trainingSession.week === week)
                  .sort((a, b) => (a.dayOfWeek > b.dayOfWeek ? 1 : -1))
                  .map((trainingSession) => (
                    <TrainingProgramPageSession
                      key={`${trainingSession.week}_${trainingSession.dayOfWeek}`}
                      trainingSession={trainingSession}
                      handleUpdate={updateSession}
                    />
                  ))}
              </React.Fragment>
            );
          })}
        </Grid>
      </Scrollbar>
    </Card>
  );
}
