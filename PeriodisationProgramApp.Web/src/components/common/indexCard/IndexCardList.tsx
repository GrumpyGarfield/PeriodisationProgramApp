import { Avatar, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../../styling/Theme";

export type IndexCardListItemProps = {
  label: string;
  tooltip: string | ReactNode;
  value: number | undefined;
  onChange?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

type Props = {
  items: IndexCardListItemProps[];
};

export function IndexCardList({ items }: Props) {
  const itemsCount = items.length;

  return (
    <Grid
      container
      spacing={2}
      columns={itemsCount}
      sx={{ textAlign: "center" }}
      alignItems="center"
      justifyContent="center"
    >
      {items.map((item) => (
        <Grid item xs={1} key={item.label}>
          <Tooltip arrow title={item.tooltip}>
            <Typography variant="h6">{item.label}</Typography>
          </Tooltip>
        </Grid>
      ))}
      {items.map((item) => (
        <Grid item xs={1} key={`${item.label}-${item.value}`}>
          {item.onChange === undefined ? (
            <Avatar
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: "transparent",
                p: 3,
                margin: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                {item.value
                  ? item.value % 1 !== 0
                    ? item.value.toFixed(1)
                    : item.value.toString()
                  : undefined}
              </Typography>
            </Avatar>
          ) : (
            <TextField
              defaultValue={item.value}
              type="number"
              onBlur={item.onChange}
              inputProps={{
                min: 0,
                style: { textAlign: "center" },
              }}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
