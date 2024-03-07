import React, { useState } from 'react';
import {Card} from './card'; // Assuming you have a Card component
import json from '../jsonTest.json';
export function List({ list }){
  const [cards, setCards] = useState([json]);
  // Function to handle editing of a card
  const handleEdit = (id, editedTitle, editedDescription, editedDueDate, editedTags, editedAssignedMembers) => {
    // Find the card with the given id
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        // Update the card data
        return {
          ...card,
          title: editedTitle,
          description: editedDescription,
          dueDate: editedDueDate,
          Tags: editedTags,
          assignedMembers: editedAssignedMembers
        };
      }
      return card;
    });

    // Update the state with the updated cards
    setCards(updatedCards);
  };

  return (
    <div>
      {cards.map(card => (
        <Card key={card.id} card={card} onEdit={handleEdit} />
      ))}
    </div>
  );
}
