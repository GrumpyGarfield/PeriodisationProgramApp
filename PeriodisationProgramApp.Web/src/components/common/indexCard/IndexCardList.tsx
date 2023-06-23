import {
  Grid,
  Card,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import InfoPopover from "../popover/InfoPopover";

export type IndexCardListItemProps = {
  id: string;
  label: string;
  tooltip: string | ReactNode;
  info?: ReactNode;
  register: any;
  errors: any;
  readonly?: boolean;
};

type Props = {
  items: IndexCardListItemProps[];
};

export function IndexCardList({ items }: Props) {
  const itemsCount = items.length;

  return (
    <Card sx={{ p: 3 }}>
      <Grid
        container
        spacing={2}
        columns={itemsCount}
        sx={{ textAlign: "center" }}
        alignItems="center"
        justifyContent="center"
      >
        {items.map((item) => (
          <Grid item xs={1} key={item.id}>
            <Stack
              direction="row"
              spacing={0.5}
              justifyContent="center"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Tooltip arrow title={item.tooltip}>
                <Typography variant="h6">{item.label}</Typography>
              </Tooltip>
              {item.info !== undefined && (
                <InfoPopover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  {item.info}
                </InfoPopover>
              )}
            </Stack>
          </Grid>
        ))}
        {items.map((item) => (
          <Grid item xs={1} key={`${item.id}-val`}>
            <TextField
              id={item.id}
              type="number"
              inputProps={{
                min: 0,
                style: { textAlign: "center" },
                readOnly: item.readonly === true ? true : false,
              }}
              {...item.register}
              helperText={item.errors[item.id]?.message}
              error={item.errors[item.id] !== undefined}
              sx={{
                pointerEvents: item.readonly === true ? "none" : "inherit",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
