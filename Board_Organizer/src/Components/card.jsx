import React, { useState } from 'react';
import '../Styling/CssCard.css';

export function Card({ card, onEdit }) {
  const { id, title, description, dueDate, Tags, assignedMembers } = card;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  const [editedTags, setEditedTags] = useState([...Tags]);
  const [editedAssignedMembers, setEditedAssignedMembers] = useState([...assignedMembers]);
  const [newTag, setNewTag] = useState('');
  const [isEditingTags, setIsEditingTags] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, editedTitle, editedDescription, editedDueDate, editedTags, editedAssignedMembers);
    setIsEditing(false);
  };

  const handleAddTag = () => {
    setIsEditingTags(true);
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

  const handleTagSave = () => {
    setEditedTags([...editedTags, newTag]);
    setNewTag('');
    setIsEditingTags(false);
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
                <button className="btn btn-primary btn-sm" onClick={handleEdit}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document" style={{ maxWidth: '600px', maxHeight: "400px" }}>
            <div className="modal-content">
              <div className="modal-header row">
                <h5 className="modal-title col-11">Edit Card</h5>
                <button type="button" className="close col-auto" onClick={() => setIsEditing(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group" >
                  <strong>Title:</strong>
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    <input className="form-control" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                  </div>
                </div>
                <div className="form-group"  style={{ paddingTop: '10px',paddingBottom: '10px' }}>
                  <strong>Description:</strong>
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    <textarea className="form-control" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <strong >Due Date:</strong>
                  <input className="form-control" type="date" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} />
                </div>
                <div className="form-group">
  <div className='row' style={{ paddingTop: '10px',paddingBottom: '10px' }}>
    <strong className='col-11'>Tags:</strong>  
    <button className="btn btn-sm btn-success col-auto" onClick={handleAddTag} style={{ fontSize: "0.7rem", padding: "0.1rem 0.3rem" }}>Add</button>
  </div>
  <p>
    <div style={{ maxHeight: '60px', overflowY: 'auto' }} className="container">
      <div className="row">
        {editedTags.map((tag, index) => (
          <div key={index} className="col-auto">
            <div className="input-group mb-3">
              <span
                key={index}
                className={`tag tag${index % 2 + 1}`}
              >
                {tag}
              </span>
              <div className="input-group-append">
                <button className="btn btn-sm" type="button" style={{ fontSize: "0.7rem", padding: "0.1rem 0.3rem", backgroundColor: 'rgba(173, 216, 230, 0.7)', color: 'black' }} onClick={() => handleRemoveTag(index)}>x</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </p>
</div>

                <div className="form-group">
                  <strong>Assigned Members:</strong>
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
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
                          <button className="btn btn-danger btn-sm" type="button" onClick={() => handleRemoveMember(index)}>X</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-success btn-sm" onClick={handleAddMember}>Add Member</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSave}>Save changes</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditingTags && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Tags</h5>
                <button type="button" className="close" onClick={() => setIsEditingTags(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <strong>Add New Tag:</strong>
                  <input
                    type="text"
                    className="form-control"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-sm" onClick={handleTagSave}>Save Tag</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditingTags(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
