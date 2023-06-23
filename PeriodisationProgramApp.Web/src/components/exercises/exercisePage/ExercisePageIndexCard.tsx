import { Exercise } from "../../../types/enitities/Exercise";
import {
  IndexCardList,
  IndexCardListItemProps,
} from "../../common/indexCard/IndexCardList";
import useExercise from "../../../context/entityContext/entities/exercise/useExercise";
import { RsmIndexInfo } from "../../info/RsmIndexInfo";
import { FmIndexInfo } from "../../info/FmIndexInfo";
import { SfrIndexInfo } from "../../info/SfrIndexInfo";
import useAuthentication from "../../../hooks/useAuthentication";

type Props = {
  exercise: Exercise;
};

export default function ExercisePageIndexCard({ exercise }: Props) {
  const { isUserAuthenticated } = useAuthentication();
  const { registerUserData, submitUserData, userDataFormErrors } = useExercise(
    exercise.id
  );

  const exerciseIndexCardListItems: IndexCardListItemProps[] = [
    {
      id: "rawStimulusMagnitude",
      label: "RSM",
      info: <RsmIndexInfo />,
      tooltip: "Raw Stimulus Magnitude",
      register: {
        ...registerUserData("rawStimulusMagnitude", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 9, message: "Must be lower than 9" },
          valueAsNumber: true,
          onBlur: isUserAuthenticated ? submitUserData : undefined,
        }),
      },
      errors: userDataFormErrors,
      readonly: !isUserAuthenticated,
    },
    {
      id: "fatigueMagnitude",
      label: "FM",
      info: <FmIndexInfo />,
      tooltip: "Fatigue Magnitude",
      register: {
        ...registerUserData("fatigueMagnitude", {
          min: { value: 0, message: "Must be at least 0" },
          max: { value: 9, message: "Must be lower than 9" },
          valueAsNumber: true,
          onBlur: isUserAuthenticated ? submitUserData : undefined,
        }),
      },
      errors: userDataFormErrors,
      readonly: !isUserAuthenticated,
    },
    {
      id: "stimulusToFatigueRatio",
      label: "SFR",
      info: <SfrIndexInfo />,
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
