import React, { useState } from 'react';

export function Card({ card, onEdit }) {
  const { id, title, description, dueDate, Tags, assignedMembers } = card;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  const [editedTags, setEditedTags] = useState([...Tags]);
  const [editedAssignedMembers, setEditedAssignedMembers] = useState([...assignedMembers]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call the onEdit function to update the card data
    onEdit(id, editedTitle, editedDescription, editedDueDate, editedTags, editedAssignedMembers);
  
    // After saving, exit edit mode
    setIsEditing(false);
  };

  const handleAddTag = () => {
    setEditedTags([...editedTags, '']);
  };

  const handleAddMember = () => {
    setEditedAssignedMembers([...editedAssignedMembers, { name: '' }]);
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
      {isEditing ? (
        <>
          <input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
          <input type="date" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} />
          {editedTags.map((tag, index) => (
            <div key={index}>
              <input 
                value={tag} 
                onChange={(e) => {
                  const newTags = [...editedTags];
                  newTags[index] = e.target.value;
                  setEditedTags(newTags);
                }} 
              />
            </div>
          ))}
          <button onClick={handleAddTag}>Add Tag</button>
          {editedAssignedMembers.map((member, index) => (
            <div key={index}>
              <input 
                value={member.name} 
                onChange={(e) => {
                  const newMembers = [...editedAssignedMembers];
                  newMembers[index] = { name: e.target.value };
                  setEditedAssignedMembers(newMembers);
                }} 
              />
            </div>
          ))}
          <button onClick={handleAddMember}>Add Member</button>
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h4>{title}</h4>
          <p>{description}</p>
          <p>Due Date: {dueDate}</p>
          <p>Tags: {Tags.join(', ')}</p>
          <p>Assigned Members: {assignedMembers.map(member => member.name).join(', ')}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}
