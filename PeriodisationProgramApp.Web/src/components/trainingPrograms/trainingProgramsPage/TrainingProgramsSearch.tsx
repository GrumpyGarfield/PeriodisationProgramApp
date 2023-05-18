import { OutlinedInput, InputAdornment } from "@mui/material";
import Iconify from "../../../components/common/iconify/Iconify";
import { useState } from "react";
import useTrainingPrograms from "../../../context/entityContext/entities/useTrainingPrograms";

export default function TrainingProgramsSearch() {
  const [filter, setFilter] = useState<string>("");
  const { filterTrainingPrograms } = useTrainingPrograms();

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    filterTrainingPrograms([
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
      placeholder="Search program..."
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
