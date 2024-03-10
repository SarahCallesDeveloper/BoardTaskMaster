import React, { useState } from 'react';
import { Droppable, DragDropContext,Draggable } from 'react-beautiful-dnd';
import { List } from "./list";

export function Board({ boardData }) {
  const { id, lists: initialLists, name } = boardData;
  const [lists, setLists] = useState(initialLists);

  const handleAddList = () => {
    const newList = {
      id: Math.random().toString(36).substr(2, 9),
      name: `List ${lists.length + 1}`,
      cards: []
    };
    setLists(prevLists => [...prevLists, newList]);
  };

  const handleRemoveList = (id) => {
    setLists(prevLists => prevLists.filter(list => list.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the droppable area
  
    const { source, destination } = result;
  
    const updatedLists = Array.from(lists);
    const [draggedList] = updatedLists.splice(source.index, 1);
    updatedLists.splice(destination.index, 0, draggedList);
  
    setLists(updatedLists);
  };
  return (
    <>

      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand">{name}</span>
            <button className="btn btn-outline-light me-2" onClick={handleAddList}>Add List</button>
          </div>
        </nav>
    
        <div className="container-fluid py-3" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
        {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className='board' id={id}></div>
          <div className=" row row-cols-auto flex-nowrap" style={{ marginRight: '-5px' }}>
        
            {lists.map((list, index) => (
             <Draggable key={list.id} draggableId={list.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}{...provided.dragHandleProps} className="col-3 px-1">
                    <List list={list} onRemove={() => handleRemoveList(list.id)} />
                   
                  </div>
                )}
            </Draggable>
            ))}
          </div>
          </div> 
          )}
          </Droppable>
        </DragDropContext>
        </div>
      </div>

    </>
  );
}
