import {
  Button,
  ButtonProps,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import { theme } from "../../../styling/Theme";

type Props = {
  title: string;
  progressTitle: string;
  isProgressing: boolean;
} & ButtonProps;

export function ProgressButton({
  title,
  progressTitle,
  isProgressing,
  ...props
}: Props) {
  return (
    <Button {...props}>
      {isProgressing ? (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CircularProgress
            size="0.75rem"
            sx={{ color: theme.palette.primary.contrastText }}
          />
          <Box>{progressTitle}</Box>
        </Stack>
      ) : (
        title
      )}
    </Button>
  );
}
