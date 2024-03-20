import React, { useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Board } from './board'; // Assuming Board component is defined elsewhere
import jsonBoard from "../BoardTest.json";

const BoardHandler = () => {
  const [board, setBoard] = useState(jsonBoard);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Find source and destination lists
    const sourceListIndex = board.lists.findIndex(list => list.id === source.droppableId);
    const destinationListIndex = board.lists.findIndex(list => list.id === destination.droppableId);

    // Create copies of the source and destination lists
    const newBoard = { ...board };
    const newSourceList = { ...newBoard.lists[sourceListIndex] };
    const newDestinationList = { ...newBoard.lists[destinationListIndex] };

    // Remove the task from the source list
    const [task] = newSourceList.cards.splice(source.index, 1);

    // Insert the task into the destination list
    newDestinationList.cards.splice(destination.index, 0, task);

    // Update the lists array with the modified lists
    newBoard.lists = [...newBoard.lists];
    newBoard.lists[sourceListIndex] = newSourceList;
    newBoard.lists[destinationListIndex] = newDestinationList;

    setBoard(newBoard);
  }, [board]);

  return (
 
      <Board board={board} handleDragEnd={handleDragEnd}/>

  );
};

export default BoardHandler;
