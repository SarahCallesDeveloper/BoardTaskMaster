import React, { useState } from 'react';
import { List } from "./list";
import jsonList from "../listTest.json";

export function Board({ boardData }) {
  const { id, lists: initialLists, name } = boardData;
  const [lists, setLists] = useState(initialLists);

  // Function to add a new list
  const handleAddList = () => {
    const newList = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random id for the new list
      name: `List ${lists.length + 1}`, // Example name for the new list
      cards: [] // Example initial cards for the new list
    };
    setLists(prevLists => [...prevLists, newList]);
  };

  // Function to remove a list by id
  const handleRemoveList = (id) => {
    setLists(prevLists => prevLists.filter(list => list.id !== id));
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">{name}</span>
          <div className="d-flex">
            <button className="btn btn-outline-light me-2" onClick={handleAddList}>Add List</button>
            {/* Example button to remove a list, replace with your desired UI */}
            <button className="btn btn-outline-light" onClick={() => handleRemoveList(lists[lists.length - 1].id)}>Remove Last List</button>
          </div>
        </div>
      </nav>
      <div className="container-fluid py-3" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <div className="board row row-cols-auto flex-nowrap" style={{ marginRight: '-5px' }}>
          {lists.map(list => (
            <div className="col-3 px-1" key={list.id} style={{ minWidth: '300px' }}>
              <List list={list} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
