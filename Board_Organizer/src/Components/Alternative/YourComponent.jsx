// YourComponent.js
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from './Board';

const YourComponent = () => {
  const [lists, setLists] = useState([
    {
      id: 'list1',
      title: 'List 1',
      items: [
        { id: 'item1', content: 'Item 1' },
        { id: 'item2', content: 'Item 2' },
        { id: 'item3', content: 'Item 3' },
      ],
    },
    {
      id: 'list2',
      title: 'List 2',
      items: [
        { id: 'item4', content: 'Item 4' },
        { id: 'item5', content: 'Item 5' },
        { id: 'item6', content: 'Item 6' },
      ],
    },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceListIndex = lists.findIndex((list) => list.id === result.source.droppableId);
    const destinationListIndex = lists.findIndex((list) => list.id === result.destination.droppableId);

    const newLists = [...lists];
    const [removed] = newLists[sourceListIndex].items.splice(result.source.index, 1);
    newLists[destinationListIndex].items.splice(result.destination.index, 0, removed);

    setLists(newLists);
  };

  return <Board lists={lists} handleDragEnd={handleDragEnd} />;
};

export default YourComponent;
