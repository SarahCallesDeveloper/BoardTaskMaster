import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List } from './list'; // Assuming you have a List component
import '../Styling/CssList.css';
import "../Styling/CssScrollbar.css"
import "../Styling/CssBoard.css"

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

  const handleEdit = (id, editedListName, editedListCards) => {
    // Find the list with the given id
    const updatedListIndex = updatedLists.findIndex(list => list.id === id);
    if (updatedListIndex !== -1) {
      const updatedList = {
        ...updatedLists[updatedListIndex],
        name: editedListName,
        cards: editedListCards
      };
      // Update the list in the lists array
      const newLists = [...updatedLists];
      newLists[updatedListIndex] = updatedList;
      // Update the state with the updated lists
      setUpdatedLists(newLists);
    }
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
    <div className="container px-0 custom-container" style={{ maxWidth: '330px', height: '90vh', overflowY: 'auto', overflowX: 'hidden', background: 'linear-gradient(45deg, #FF6B6B, #FFE66D)', borderRadius: '15px' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="board" id={id}>
                 <button onClick={handleRemove}>X</button>
                <h2 className="mt-2 mb-3" style={{ textAlign: 'center', fontSize: '1.2rem', paddingTop: '10px', margin: '0' }}>{name}</h2>
                <div className="row row-cols-1 row-cols-md-1 g-1">
                  {updatedLists.map((list, index) => (
                    <Draggable key={list.id} draggableId={list.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="col">
                            <List list={list} onEdit={handleEdit} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
