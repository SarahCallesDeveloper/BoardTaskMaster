import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { List } from './list'; // Assuming you have a List component

import "../Styling/CssBoard.css"
export function Board({ board, onRemove, handleDragEnd }) {
  const { id, name, lists } = board;
  const [updatedLists, setUpdatedLists] = useState(lists);

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

  return (
    <div style={{background:"pink"}}>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">{name}</span>
          <button className="btn btn-outline-light me-2" onClick={handleAddList}>Add List</button>
          <button className="btn btn-outline-light" onClick={handleRemove}>Remove Board</button>
        </div>
      </nav>
      <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container-fluid py-3" style={{ overflowX: 'auto', overflowY: 'hidden', maxWidth: '100vw' }}>
        <div style={{ display: 'flex', width: 'max-content' }}>
          {updatedLists.map((list) => (
            <div style={{ width: '400px',}} key={list.id}>
              <List list={list} onEdit={handleEdit} onRemove={() => handleRemoveList(list.id)} />
            </div>
          ))}
        </div>
      </div>
      </DragDropContext>
    </div>
  );
}
