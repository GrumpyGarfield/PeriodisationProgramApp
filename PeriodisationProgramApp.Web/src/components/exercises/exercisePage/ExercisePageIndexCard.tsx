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
  const {
    rawStimulusMagnitude,
    setRawStimulusMagnitude,
    fatigueMagnitude,
    setFatigueMagnitude,
    stimulusToFatigueRatio,
    updateUserData,
  } = useExercise(exercise.id);

  const exerciseIndexCardListItems: IndexCardListItemProps[] = [
    {
      label: "RSM",
      tooltip: "Raw Stimulus Magnitude",
      value: rawStimulusMagnitude,
      onChange: isAuthenticated
        ? (e: React.ChangeEvent<HTMLInputElement>) => {
            const value =
              e.currentTarget.value === ""
                ? 0
                : parseInt(e.currentTarget.value);
            setRawStimulusMagnitude(value);
            updateUserData("rawStimulusMagnitude", value);
          }
        : undefined,
    },
    {
      label: "FM",
      tooltip: "Fatigue Magnitude",
      value: fatigueMagnitude,
      onChange: isAuthenticated
        ? (e: React.ChangeEvent<HTMLInputElement>) => {
            const value =
              e.currentTarget.value === ""
                ? 0
                : parseInt(e.currentTarget.value);
            setFatigueMagnitude(value);
            updateUserData("fatigueMagnitude", value);
          }
        : undefined,
    },
    {
      label: "SFR",
      tooltip: "Stimulus to Fatigue Ratio",
      value: stimulusToFatigueRatio,
    },
  ];

  return <IndexCardList items={exerciseIndexCardListItems} />;
}
