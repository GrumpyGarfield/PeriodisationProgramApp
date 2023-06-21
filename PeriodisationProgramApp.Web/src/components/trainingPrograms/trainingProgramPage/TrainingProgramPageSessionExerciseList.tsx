import { memo } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import {
  TrainingProgramPageSessionExerciseItem,
  TrainingProgramPageSessionExerciseItemProps,
} from "./TrainingProgramPageSessionExerciseItem";
import { StrictModeDroppable } from "../../common/draggable/StrictModeDroppable";

export type TrainingProgramPageSessionExerciseListProps = {
  items: TrainingProgramPageSessionExerciseItemProps[];
  onDragEnd: OnDragEndResponder;
  onDelete: (index: number) => void;
};

const TrainingProgramPageSessionExerciseList = memo(
  ({
    items,
    onDragEnd,
    onDelete,
  }: TrainingProgramPageSessionExerciseListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <TrainingProgramPageSessionExerciseItem
                  key={item.id}
                  item={item}
                  index={index}
                  onDelete={onDelete}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    );
  }
);

export default TrainingProgramPageSessionExerciseList;
