import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        {lists.map((list, index) => (
          <Droppable key={list.id} droppableId={list.id}>
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
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 16,
                          margin: '0 0 8px 0',
                          minHeight: '50px',
                          backgroundColor: 'white',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default YourComponent;
