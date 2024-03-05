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

  const handleRemoveTag = (index) => {
    const newTags = [...editedTags];
    newTags.splice(index, 1);
    setEditedTags(newTags);
  };

  const handleRemoveMember = (index) => {
    const newMembers = [...editedAssignedMembers];
    newMembers.splice(index, 1);
    setEditedAssignedMembers(newMembers);
  };

  return (
    <div className="card" style={{ border: '1px solid black', margin: '10px 0' }}>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{description}</p>
        <p className="card-text">Due Date: {dueDate}</p>
        <p className="card-text">Assigned Members: {assignedMembers.map(member => member.name).join(', ')}</p>
        <p className="card-text">Tags: {Tags.join(', ')}</p>
        <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
      </div>

      {isEditing && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Card</h5>
                <button type="button" className="close" onClick={() => setIsEditing(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <strong>Title:</strong>
                  <input className="form-control" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                </div>
                <div className="form-group">
                  <strong>Description:</strong>
                  <textarea className="form-control" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                </div>
                <div className="form-group">
                  <strong>Due Date:</strong>
                  <input className="form-control" type="date" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <strong>Tags:</strong>
                  {editedTags.map((tag, index) => (
                    <div key={index} className="input-group mb-3">
                      <input 
                        className="form-control" 
                        value={tag} 
                        onChange={(e) => {
                          const newTags = [...editedTags];
                          newTags[index] = e.target.value;
                          setEditedTags(newTags);
                        }} 
                      />
                      <div className="input-group-append">
                        <button className="btn btn-danger" type="button" onClick={() => handleRemoveTag(index)}>X</button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-success" onClick={handleAddTag}>Add Tag</button>
                </div>
                <div className="form-group">
                  <strong>Assigned Members:</strong>
                  {editedAssignedMembers.map((member, index) => (
                    <div key={index} className="input-group mb-3">
                      <input 
                        className="form-control" 
                        value={member.name} 
                        onChange={(e) => {
                          const newMembers = [...editedAssignedMembers];
                          newMembers[index] = { name: e.target.value };
                          setEditedAssignedMembers(newMembers);
                        }} 
                      />
                      <div className="input-group-append">
                        <button className="btn btn-danger" type="button" onClick={() => handleRemoveMember(index)}>X</button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-success" onClick={handleAddMember}>Add Member</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
