import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {Board} from './board'; // Assuming Board component is defined elsewhere
import jsonBoard from "../BoardTest.json";

const BoardHandler = () => {
  const [board, setBoard] = useState(jsonBoard);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Find source and destination lists
    const sourceList = board.lists.find(list => list.id === source.droppableId);
    const destinationList = board.lists.find(list => list.id === destination.droppableId);

    // Find the task being dragged
    const task = sourceList.cards.find(card => card.id === draggableId);

    // Remove the task from the source list
    sourceList.cards = sourceList.cards.filter(card => card.id !== draggableId);

    // Add the task to the destination list
    destinationList.cards.splice(destination.index, 0, task);

    setBoard({ ...board });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Board board={board} />
    </DragDropContext>
  );
};

export default BoardHandler;
