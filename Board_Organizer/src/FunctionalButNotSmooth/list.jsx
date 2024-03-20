import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from './card'; // Assuming you have a Card component
import '../Styling/CssList.css';
import "../Styling/CssScrollbar.css"

export function List({ list, onRemove }) {
  const { id, name, cards } = list;
  const [updatedCards, setUpdatedCards] = useState(cards);

  const handleRemove = () => {
    const confirmation = window.confirm("Are you sure you want to remove this list?");
    if (confirmation) {
      onRemove(id);
    }
  };

  const handleEdit = (id, editedTitle, editedDescription, editedDueDate, editedTags, editedAssignedMembers) => {
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
      const newCards = [...updatedCards];
      newCards[updatedCardIndex] = updatedCard;
      setUpdatedCards(newCards);
    }
  };

  const handleAddCard = () => {
    const newCard = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Card",
      description: "",
      dueDate: "",
      Tags: [],
      assignedMembers: []
    };
    setUpdatedCards(prevCards => [...prevCards, newCard]);
  };

  const handleRemoveCard = (cardId) => {
    setUpdatedCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  return (
    <div className="container px-0 custom-container" style={{ maxWidth: '330px', height: '86vh', overflowY: 'auto', overflowX: 'hidden', background: 'linear-gradient(45deg, #FF6B6B, #FFE66D)', borderRadius: '15px' }}>
      <button onClick={handleRemove}>X</button>
      <h2 className="mt-2 mb-3" style={{ textAlign: 'center', fontSize: '1.2rem', paddingTop: '10px', margin: '0' }}>{name}</h2>
      <button onClick={handleAddCard} style={{ margin: '0 10px 10px 10px' }}>Add Card</button>

      <Droppable droppableId={id} type="CARD">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="list" id={id}>
            <div className="row row-cols-1 row-cols-md-1 g-1">
              {updatedCards.map((card, index) => (
                <div className="col" key={card.id}>
                  <Card card={card} onEdit={handleEdit} index={index} onRemove={() => handleRemoveCard(card.id)} style={{ borderRadius: '15px', boxShadow: snapshot.isDragging ? '0 4px 8px 0 rgba(0, 0, 0, 0.2)' : 'none' }} />
                </div>
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
