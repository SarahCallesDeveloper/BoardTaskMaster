import React from 'react';
import { List } from "./list";
import jsonList from "../listTest.json";

export function Board({ boardData }) {
  const { id, lists, name } = boardData;

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">{name}</span>
          <div className="d-flex">
            <button className="btn btn-outline-light me-2">Sample Button</button>
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown Button
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid py-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', overflowX: 'auto' }}>
        <div className="board row" style={{ paddingRight: '15px' }}>
          {lists.map(list => (
            <div className="col-4" key={list.id} style={{ minWidth: '300px' }}>
              <List list={list} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
