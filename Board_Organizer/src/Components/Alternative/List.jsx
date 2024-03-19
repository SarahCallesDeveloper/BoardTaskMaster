// List.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const List = ({ list }) => {
  return (
    <Droppable droppableId={list.id} key={list.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            margin: 8,
            border: '1px solid lightgrey',
            borderRadius: 2,
            minWidth: 200,
            padding: 8,
          }}
        >
          <h2>{list.title}</h2>
          {list.items.map((item, index) => (
            <Card key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default List;
