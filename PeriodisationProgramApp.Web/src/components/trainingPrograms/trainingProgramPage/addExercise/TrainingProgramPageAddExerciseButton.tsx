import AddIcon from "@mui/icons-material/Add";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BasicModal } from "../../../common/modal/BasicModal";
import { useState } from "react";
import { TrainingSessionExercise } from "../../../../types/enitities/TrainingSessionExercise";
import { TrainingProgramPageAddExerciseModal } from "./TrainingProgramPageAddExerciseModal";

type Props = {
  onAdd: (trainingSessionExercise: TrainingSessionExercise) => void;
};

export function TrainingProgramPageAddExerciseButton({ onAdd }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (trainingSessionExercise: TrainingSessionExercise) => {
    onAdd(trainingSessionExercise);
    setIsModalOpen(false);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: "1rem" }}
          onClick={() => setIsModalOpen(true)}
        >
          <ListItemIcon sx={{ minWidth: "2rem" }}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add New" sx={{ fontStyle: "italic" }} />
        </ListItemButton>
      </ListItem>
      <BasicModal
        title="Add new exercise"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        width={"75vw"}
      >
        <TrainingProgramPageAddExerciseModal onSubmit={handleSubmit} />
      </BasicModal>
    </>
  );
}
