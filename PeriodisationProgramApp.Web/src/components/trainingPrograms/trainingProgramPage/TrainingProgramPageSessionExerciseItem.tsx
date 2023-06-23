import { ListItem, ListItemText, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { HoverPopover } from "../../common/popover/HoverPopover";
import { CloseIconButton } from "../../common/button/icon/CloseIconButton";
import useTrainingSchedule from "../../../context/trainingScheduleContext/useTrainingSchedule";

export type TrainingProgramPageSessionExerciseItemProps = {
  id: string;
  title: string | ReactNode;
  subtitle?: string;
  popover?: ReactNode;
};

type Props = {
  item: TrainingProgramPageSessionExerciseItemProps;
  index: number;
  onDelete: (index: number) => void;
};

export function TrainingProgramPageSessionExerciseItem({
  item,
  index,
  onDelete,
}: Props) {
  const { isEditMode } = useTrainingSchedule();
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [delay, setDelay] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setDelay(true);
    setHovered(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setDelay(false);
    setHovered(false);
    setAnchorEl(null);
  };

  const onTimeout = () => {
    setDelay(false);
  };

  useEffect(() => {
    const timer = hovered ? setTimeout(onTimeout, 750) : undefined;
    return () => {
      clearTimeout(timer);
    };
  }, [hovered]);

  return (
    <Draggable draggableId={item.id} index={index} isDragDisabled={!isEditMode}>
      {(provided, snapshot) => (
        <ListItem
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-owns={Boolean(anchorEl) ? `item-popover-${item.id}` : undefined}
          aria-haspopup={item.popover ? true : false}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging || hovered ? "bg-gray-200" : ""}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
            sx={{ width: "100%" }}
          >
            <ListItemText
              primary={item.title}
              secondary={item.subtitle}
              primaryTypographyProps={{
                style: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
            {isEditMode && hovered && (
              <CloseIconButton size="small" onClick={() => onDelete(index)} />
            )}
          </Stack>
          {item.popover !== undefined && !delay ? (
            <HoverPopover
              id={`item-popover-${item.id}`}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {item.popover}
            </HoverPopover>
          ) : null}
        </ListItem>
      )}
    </Draggable>
  );
}
