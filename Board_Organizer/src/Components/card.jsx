import React, { useState } from 'react';
import '../Styling/CssCard.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function Card({ card, onEdit,onRemove,index }) {
 
  const { id, title, description, dueDate, Tags, assignedMembers } = card;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  const [editedTags, setEditedTags] = useState([...Tags]);
  const [editedAssignedMembers, setEditedAssignedMembers] = useState([...assignedMembers]);
  const [newTag, setNewTag] = useState('');
  const [isEditingTags, setIsEditingTags] = useState(false);

  console.log("Card index: ", index)
  const [collapsed, setCollapsed] = useState(true);
  
  const handleToggleCollapse = () => {
      setCollapsed(!collapsed);
    };
  
  const handleRemove = () => {
    const confirmation = window.confirm("Are you sure you want to remove this Card?");
    if (confirmation) {
      onRemove(id);
    }
  };
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
    
    <div className="container">
     
    <div className="card" style={{ maxWidth: '320px', position: 'relative' }}>
      
      {/* Overlay element */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0, 102, 255, 0.2), rgba(0, 255, 128, 0.2))', pointerEvents: 'none' }}></div>

      <div className="card-body" style={{ paddingTop: collapsed ? '0' : '0', paddingBottom: collapsed ? '0' : '0', paddingLeft: '0', paddingRight: '0' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="card-title mb-0">{title}</h6>
          <button className="btn text-primary" type="button" onClick={handleToggleCollapse} style={{ padding: "0" }}>
            ?<i className={`bi bi-${collapsed ? 'plus' : 'dash'}-circle`}></i>
          </button>
        </div>
        <p style={{ paddingLeft: "3px" }} className='date'>{dueDate}</p>
        <div className={`collapse ${collapsed ? '' : 'show'}`}>
          {description && <p className='description'>{description}</p>}
          <p>
            {assignedMembers.map((member, index) => (
              <span
                key={index}
                className={`member member${index % 2 + 1}`}
                style={{ padding: '3px' }}
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
                style={{ padding: '0' }}
              >
                {tag}
              </span>
            ))}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <button className="btn btn-primary btn-sm" onClick={handleEdit}>Edit</button>
  <button className="btn btn-danger btn-sm" onClick={handleRemove}>X</button>
</div></div>
      </div>
    </div>
  
      {isEditing && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document" style={{ maxWidth: '600px', maxHeight: "400px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title col-11">Edit Card</h5>
                <button type="button" className="close col-auto" onClick={() => setIsEditing(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className='row'>
                <div className="form-group col-9" >
                  <strong>Title:</strong>
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    <input className="form-control" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                  </div>
                </div>
                <div className="form-group col-3">
                  <strong >Due Date:</strong>
                  <input className="form-control" type="date" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} />
                </div>
                </div>
                <div className="form-group"  style={{ paddingTop: '10px',paddingBottom: '10px' }}>
                  <strong>Description:</strong>
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    <textarea className="form-control" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                  </div>
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
