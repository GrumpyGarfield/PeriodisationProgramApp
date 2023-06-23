import { Stack, Chip, Tooltip, StackProps } from "@mui/material";

type ItemProps = {
  text: string;
  tooltip: string;
  icon?: any;
};

type Props = {
  items: ItemProps[];
} & StackProps;

export function ChipStackWithTooltips({ items, ...props }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="start"
      spacing={2}
      {...props}
    >
      {items.map((item) => (
        <Tooltip title={item.tooltip} key={item.tooltip}>
          <Chip icon={item.icon} label={item.text} sx={{ px: 1 }} />
        </Tooltip>
      ))}
    </Stack>
  );
}
