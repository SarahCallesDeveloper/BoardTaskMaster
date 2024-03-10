import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Card } from './Components/card'; // Adjust the import path accordingly
import json from './jsonTest.json'; // Assuming you have a JSON file with card data
import jsonList from "./listTest.json"
//import {List} from "./Components/list"
//import {Board} from "./Components/Board"
import jsonBoard from "./BoardTest.json"
import {Board} from "./Components/alternativeboard"
//import {Card} from "./Components/AlternativeCard"

function App() {
  console.log("jsonList",jsonList)
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

//<Board boardData={jsonBoard}></Board>
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
 <Board board={jsonBoard}/>
  {console.log("jsonBoard: ",jsonBoard)}
  </>,
);