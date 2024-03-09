import React, { useState } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
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
    const { source, destination } = result;
    // Check if the drag ended outside the droppable area or if the position hasn't changed
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Find the source and destination lists
    const sourceList = lists.find(list => list.id === source.droppableId);
    const destinationList = lists.find(list => list.id === destination.droppableId);

    // Find the dragged card
    const draggedCard = sourceList.cards[source.index];

    // Remove the card from the source list
    const updatedSourceCards = [...sourceList.cards];
    updatedSourceCards.splice(source.index, 1);

    // Add the card to the destination list
    const updatedDestinationCards = [...destinationList.cards];
    updatedDestinationCards.splice(destination.index, 0, draggedCard);

    // Update the lists with the new card positions
    const updatedLists = lists.map(list => {
      if (list.id === source.droppableId) {
        return { ...list, cards: updatedSourceCards };
      }
      if (list.id === destination.droppableId) {
        return { ...list, cards: updatedDestinationCards };
      }
      return list;
    });

    // Update the state with the new lists
    setLists(updatedLists);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand">{name}</span>
            <button className="btn btn-outline-light me-2" onClick={handleAddList}>Add List</button>
          </div>
        </nav>
        <div className="container-fluid py-3" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
          <div className="board row row-cols-auto flex-nowrap" style={{ marginRight: '-5px' }}>
            {lists.map((list, index) => (
              <Droppable droppableId={list.id} key={list.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="col-3 px-1">
                    <List list={list} onRemove={() => handleRemoveList(list.id)} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
