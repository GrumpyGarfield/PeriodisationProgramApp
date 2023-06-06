import { Exercise } from "../../../types/enitities/Exercise";
import {
  IndexCardList,
  IndexCardListItemProps,
} from "../../common/indexCard/IndexCardList";
import useExercise from "../../../context/entityContext/entities/exercise/useExercise";

type Props = {
  exercise: Exercise;
  isAuthenticated: boolean;
};

export default function ExercisePageIndexCard({
  exercise,
  isAuthenticated,
}: Props) {
  const { registerUserData, submitUserData, userDataFormErrors } = useExercise(
    exercise.id
  );

  const exerciseIndexCardListItems: IndexCardListItemProps[] = [
    {
      id: "rawStimulusMagnitude",
      label: "RSM",
      tooltip: "Raw Stimulus Magnitude",
      register: {
        ...registerUserData("rawStimulusMagnitude", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 9, message: "Must be lower than 9" },
          valueAsNumber: true,
          onBlur: submitUserData,
        }),
      },
      errors: userDataFormErrors,
    },
    {
      id: "fatigueMagnitude",
      label: "FM",
      tooltip: "Fatigue Magnitude",
      register: {
        ...registerUserData("fatigueMagnitude", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 9, message: "Must be lower than 9" },
          valueAsNumber: true,
          onBlur: submitUserData,
        }),
      },
      errors: userDataFormErrors,
    },
    {
      id: "stimulusToFatigueRatio",
      label: "SFR",
      tooltip: "Stimulus to Fatigue Ratio",
      register: {
        ...registerUserData("stimulusToFatigueRatio", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 9, message: "Must be lower than 9" },
          valueAsNumber: true,
        }),
      },
      errors: userDataFormErrors,
      readonly: true,
    },
  ];

  return <IndexCardList items={exerciseIndexCardListItems} />;
}
