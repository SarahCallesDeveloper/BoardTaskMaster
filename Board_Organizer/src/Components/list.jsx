import React, { useState } from 'react';
import {Card} from './card'; // Assuming you have a Card component
import '../Styling/CssList.css';

export function List({ list }){
  const { id, name, cards } = list;
 console.log("cards:",cards)
  const [updatedCards, setUpdatedCards] = useState(cards);

  
  // Function to handle editing of a card
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

  return (
<div className="container px-0 custom-container" style={{ maxWidth: '330px', height: '90vh', overflowY: 'auto', overflowX: 'hidden', background: 'linear-gradient(45deg, #FF6B6B, #FFE66D)', borderRadius: '15px' }}>
  <div className="list" id={id}>
    <h2 className="mt-2 mb-3" style={{ textAlign: 'center', fontSize: '1.2rem', paddingTop: '10px', margin: '0' }}>{name}</h2>
    <div className="row row-cols-1 row-cols-md-1 g-1">
      {cards.map(card => (
        <div key={card.id} className="col">
          <Card card={card} onEdit={handleEdit} style={{ borderRadius: '15px' }} />
        </div>
      ))}
    </div>
  </div>
</div>



  );
}
