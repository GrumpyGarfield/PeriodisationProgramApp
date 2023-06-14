import {
  FormControl,
  FormControlProps,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import Iconify from "../iconify/Iconify";

type PlateProps = {
  item: any;
  label: string;
  disabled?: boolean;
  icon?: string;
  subtitle?: string;
};

type Props = {
  items: PlateProps[];
  value: any;
  onChange: (...event: any[]) => void;
} & FormControlProps;

export function TogglePlateGroup({ items, value, onChange, ...props }: Props) {
  return (
    <FormControl {...props}>
      <ToggleButtonGroup exclusive fullWidth color="success">
        {items.map(({ item, label, disabled, icon, subtitle }) => (
          <ToggleButton
            key={item}
            value={item}
            aria-label={label}
            selected={item === value}
            onClick={() => onChange(item)}
            disabled={disabled}
            sx={{ p: 3 }}
          >
            <Stack>
              {icon && (
                <Iconify icon={icon} width={30} sx={{ mx: "auto", mb: 2 }} />
              )}

              {label}
              <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
                {subtitle}
              </Typography>
            </Stack>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
}
