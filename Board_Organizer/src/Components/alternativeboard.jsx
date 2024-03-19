import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List } from './list'; // Assuming you have a List component

import "../Styling/CssScrollbar.css"

export function Board({ board, onRemove }) {
  const { id, name, lists } = board;
  const [updatedLists, setUpdatedLists] = useState(lists);

  // Function to handle editing of a list
  const handleRemove = () => {
    const confirmation = window.confirm("Are you sure you want to remove this board?");
    if (confirmation) {
      onRemove(board.id);
    }
  };

  const handleAddList = () => {
    const newList = {
      id: Math.random().toString(36).substr(2, 9),
      name: `List ${updatedLists.length + 1}`,
      cards: []
    };
    setUpdatedLists(prevLists => [...prevLists, newList]);
  };
  const handleRemoveList = (id) => {
    setUpdatedLists(prevLists => prevLists.filter(list => list.id !== id));
  };


  const handleEdit = (id, editedListName, editedListCards) => {
    const updatedListsCopy = updatedLists.map(list => {
      if (list.id === id) {
        return {
          ...list,
          name: editedListName,
          cards: editedListCards
        };
      }
      return list;
    });
    setUpdatedLists(updatedListsCopy);
  };

  // Function to handle reordering of lists
  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the board
    const items = Array.from(updatedLists);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setUpdatedLists(items);
  };

  return (
    <div style={{background:"pink"}}>
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">{name}</span>
        <button className="btn btn-outline-light me-2" onClick={handleAddList}>Add List</button>
      </div>
    </nav>
    <div className="container-fluid py-3" style={{ overflowX: 'auto', overflowY: 'hidden', maxWidth: '100vw' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: 'flex',
                width: 'max-content' // Set the width to max-content to allow the container to expand based on its content
              }}
            >
              {updatedLists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        width: '300px', // Set a fixed width for each list container
                        marginRight: '8px' // Adjust spacing between draggable items as needed
                      }}
                    >
                      <List list={list} onEdit={handleEdit} onRemove={() => handleRemoveList(list.id)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  </div>
  
  
  );
}
