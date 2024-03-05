import React from 'react';

export function Card({ card }) {
    const { title, description, dueDate, Tags, assignedMembers } = card;
  
    return (
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>Due Date: {dueDate}</p>
        <p>Tags: {Tags.join(', ')}</p>
        <p>Assigned Members: {assignedMembers.map(member => member.name).join(', ')}</p>
      </div>
    );
  }

function List({ list, members }) {
  return (
    <div key={list.id}>
      <h3>{list.name}</h3>
      {list.cards.map(card => (
        <Card key={card.id} card={card} members={members} />
      ))}
    </div>
  );
}

function Board({ board }) {
  return (
    <div key={board.id}>
      <h2>{board.name}</h2>
      {board.lists.map(list => (
        <List key={list.id} list={list} members={board.members} />
      ))}
    </div>
  );
}

function BoardComponent({ boards }) {
  return (
    <div>
      {boards.map(board => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
}

// Example usage
const jsonData = {
  "boards": [
    {
      "id": "board1",
      "name": "Project Board",
      "lists": [
        {
          "id": "list1",
          "name": "To Do",
          "cards": [
            {
              "id": "task1",
              "title": "Create Wireframes",
              "description": "Design wireframes for the new feature",
              "dueDate": "2024-03-10",
              "Tags": ["Design"],
              "assignedMembers": ["user1", "user2"]
            },
            {
              "id": "task2",
              "title": "Set Up Server",
              "description": "Configure the server for the project",
              "dueDate": "2024-03-15",
              "Tags": ["Development"],
              "assignedMembers": ["user3"]
            }
          ]
        },
        {
          "id": "list2",
          "name": "In Progress",
          "cards": [
            {
              "id": "task3",
              "title": "Implement Authentication",
              "description": "Implement user authentication in the app",
              "dueDate": "2024-03-20",
              "Tag": ["Development"],
              "assignedMembers": ["user2", "user4"]
            }
          ]
        },
        {
          "id": "list3",
          "name": "Done",
          "cards": [
            {
              "id": "task4",
              "title": "Testing",
              "description": "Perform testing on the new features",
              "dueDate": "2024-03-25",
              "Tags": ["Testing"],
              "assignedMembers": ["user1", "user3"]
            }
          ]
        }
      ],
      "members": [
        {
          "id": "user1",
          "name": "John Doe"
        },
        {
          "id": "user2",
          "name": "Jane Smith"
        },
        {
          "id": "user3",
          "name": "Bob Johnson"
        },
        {
          "id": "user4",
          "name": "Alice Brown"
        }
      ]
    }
  ]
};

function App() {
  return <BoardComponent boards={jsonData.boards} />;
}

export default App;