import { Stack, Checkbox, FormControlLabel, Typography } from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  StarBorder,
  Star,
} from "@mui/icons-material";

type Props = {
  author: string;
  likes: number;
  rating: number;
  isLiked: boolean;
  handleChange: () => void;
};

export function CardFooter({
  author,
  likes,
  rating,
  isLiked,
  handleChange,
}: Props) {
  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 5 }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontStyle: "italic" }}
        maxWidth={"50%"}
        noWrap
      >
        {author}
      </Typography>
      <Stack direction="row" spacing={1} flexShrink={0}>
        <FormControlLabel
          control={
            <Checkbox
              icon={<StarBorder sx={{ fontSize: 20 }} />}
              checkedIcon={<Star sx={{ fontSize: 20 }} color="secondary" />}
              sx={{ p: 1 }}
            />
          }
          label={rating.toFixed(1)}
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <FavoriteBorder
                  sx={{
                    fontSize: 20,
                  }}
                />
              }
              checkedIcon={<Favorite sx={{ fontSize: 20 }} color="secondary" />}
              checked={isLiked}
              onChange={handleChange}
              sx={{ p: 1 }}
            />
          }
          label={likes}
        />
      </Stack>
    </Stack>
  );
}
