import { OutlinedInput, InputAdornment } from "@mui/material";
import Iconify from "../../../components/common/iconify/Iconify";
import { useState } from "react";
import useExercises from "../../../context/entityContext/entities/exercise/useExercises";

export default function ExercisesSearch() {
  const [filter, setFilter] = useState<string>("");
  const { filterExercises } = useExercises();

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    filterExercises([
      {
        name: "name",
        value: value,
      },
    ]);
  };

  return (
    <OutlinedInput
      value={filter}
      onChange={handleFilterByName}
      placeholder="Search exercise..."
      startAdornment={
        <InputAdornment position="start">
          <Iconify
            icon="eva:search-fill"
            sx={{ color: "text.disabled", width: 20, height: 20 }}
          />
        </InputAdornment>
      }
      sx={{ width: 320 }}
    />
  );
}
