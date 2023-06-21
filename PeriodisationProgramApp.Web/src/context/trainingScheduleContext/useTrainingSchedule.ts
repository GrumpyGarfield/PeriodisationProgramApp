import { useTrainingScheduleContext } from "./TrainingScheduleContextProvider";

export const useTrainingSchedule = () => {
  const { isEditMode, setIsEditMode } = useTrainingScheduleContext();

  return {
    isEditMode,
    setIsEditMode,
  };
};

export default useTrainingSchedule;
