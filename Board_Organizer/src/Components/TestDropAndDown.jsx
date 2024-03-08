import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const elements = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
];

function ListItem({ item }) {
    return <div>{item.content}</div>;
}

export function DragAndDropList() {
    return (
        <DragDropContext>  
            <Droppable droppableId="droppable" >  
                {(provided, snapshot) => (  
                    <div  
                        {...provided.droppableProps}  
                        ref={provided.innerRef}  
                    >  
                        {elements.map((item, index) => (  
                            <Draggable key={item.id} draggableId={item.id} index={index}>  
                                {(provided, snapshot) => (  
                                   <div  
                                     ref={provided.innerRef}  
                                     {...provided.draggableProps}  
                                     {...provided.dragHandleProps}  
                                   >  
                                    <ListItem item={item} />
                                   </div>  
                                )}  
                            </Draggable>  
                        ))}
                        {provided.placeholder}
                    </div>  
                )}  
            </Droppable>  
        </DragDropContext>
    );
}

