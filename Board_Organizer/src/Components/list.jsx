import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from './card'; // Assuming you have a Card component
import '../Styling/CssList.css';
import "../Styling/CssScrollbar.css"

export function List({ list,onRemove }) {
  const { id, name, cards } = list;
  const [updatedCards, setUpdatedCards] = useState(cards);
  console.log("id: ", id)
  // Function to handle editing of a card
  
  const handleRemove = () => {
    const confirmation = window.confirm("Are you sure you want to remove this list?");
    if (confirmation) {
      onRemove(list.id);
    }
  };
  const handleEdit = (id, editedTitle, editedDescription, editedDueDate, editedTags, editedAssignedMembers) => {
    // Find the card with the given id
    const updatedCardIndex = updatedCards.findIndex(card => card.id === id);
    if (updatedCardIndex !== -1) {
      const updatedCard = {
        ...updatedCards[updatedCardIndex],
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
        Tags: editedTags,
        assignedMembers: editedAssignedMembers
      };
      // Update the card in the cards array
      const newCards = [...updatedCards];
      newCards[updatedCardIndex] = updatedCard;
      // Update the state with the updated cards
      setUpdatedCards(newCards);
    }
  };

  // Function to handle reordering of cards
  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(updatedCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setUpdatedCards(items);
  };

  return (
    <div className="container px-0 custom-container" style={{ maxWidth: '330px', height: '86vh', overflowY: 'auto', overflowX: 'hidden', background: 'linear-gradient(45deg, #FF6B6B, #FFE66D)', borderRadius: '15px' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="list" id={id}>
                 <button onClick={handleRemove}>X</button>
                <h2 className="mt-2 mb-3" style={{ textAlign: 'center', fontSize: '1.2rem', paddingTop: '10px', margin: '0' }}>{name}</h2>
                <div className="row row-cols-1 row-cols-md-1 g-1">
                  {updatedCards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="col">
                            <Card card={card} onEdit={handleEdit} style={{ borderRadius: '15px', boxShadow: snapshot.isDragging ? '0 4px 8px 0 rgba(0, 0, 0, 0.2)' : 'none' }} />
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

