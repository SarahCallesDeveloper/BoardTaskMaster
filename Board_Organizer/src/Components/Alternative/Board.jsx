// Board.js
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';

const Board = ({ lists, handleDragEnd }) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        {lists.map((list, index) => (
          <List key={list.id} list={list} index={index} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
