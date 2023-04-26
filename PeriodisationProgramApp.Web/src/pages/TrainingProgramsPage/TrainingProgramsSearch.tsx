import { OutlinedInput, InputAdornment } from "@mui/material";
import Iconify from "../../components/common/iconify/Iconify";

type Props = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TrainingProgramsSearch({
  filterName,
  onFilterName,
}: Props) {
  return (
    <OutlinedInput
      value={filterName}
      onChange={onFilterName}
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
