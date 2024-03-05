import React, { useState } from 'react';
import '../Styling/CssCard.css';

// Editable input component
function EditableInput({ value, onChange, type }) {
  return (
    <input
      className="form-control"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Editable tag component
function EditableTag({ tag, onChange, onRemove }) {
  return (
    <div className="input-group mb-3">
      <input
        className="form-control"
        value={tag}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-danger" type="button" onClick={onRemove}>
          X
        </button>
      </div>
    </div>
  );
}

// Editable list component (tags, assigned members)
function EditableList({ items, onAdd, onRemove, onChange }) {
  return (
    <>
      {items.map((item, index) => (
        <EditableTag
          key={index}
          tag={item}
          onChange={(value) => onChange(index, value)}
          onRemove={() => onRemove(index)}
        />
      ))}
      <button className="btn btn-success" onClick={onAdd}>
        Add
      </button>
    </>
  );
}

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

  const handleTagChange = (index, value) => {
    const newTags = [...editedTags];
    newTags[index] = value;
    setEditedTags(newTags);
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...editedAssignedMembers];
    newMembers[index] = { name: value };
    setEditedAssignedMembers(newMembers);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h4>{title}</h4>
                <p className='date'>{dueDate}</p>
                <p className='description'>{description}</p>
               
                <p>
                  {assignedMembers.map((member, index) => (
                    <span
                      key={index}
                      className={`member member${index % 2 + 1}`}
                      style={{ padding: '5px' }}
                    >
                      {member.name}
                    </span>
                  ))}
                </p>
                <p>
                  {Tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`tag tag${index % 2 + 1}`}
                      style={{ padding: '5px' }}
                    >
                      {tag}
                    </span>
                  ))}
                </p>
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block'  }}>
          <div className="modal-dialog" role="document" style={{ maxWidth: '600px',maxHeight:"400px"}}>
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
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    <EditableInput value={editedTitle} onChange={setEditedTitle} type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <strong>Description:</strong>
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    <EditableInput value={editedDescription} onChange={setEditedDescription} type="textarea" />
                  </div>
                </div>
                <div className="form-group">
                  <strong>Due Date:</strong>
                  <EditableInput value={editedDueDate} onChange={setEditedDueDate} type="date" />
                </div>
                <div className="form-group">
                  <strong>Tags:</strong>
                  <EditableList
                    items={editedTags}
                    onAdd={handleAddTag}
                    onRemove={handleRemoveTag}
                    onChange={handleTagChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Assigned Members:</strong>
                  <EditableList
                    items={editedAssignedMembers.map(member => member.name)}
                    onAdd={handleAddMember}
                    onRemove={handleRemoveMember}
                    onChange={handleMemberChange}
                  />
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

