import React, { useState } from "react";

const AddItems = ({ addItem, refClose, showAlert }) => {
  const [note, setNote] = useState({
    category: "",
    subcategories: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addItem(note.category, note.subcategories.split(',').map(sub => sub.trim()));
    setNote({
      category: "",
      subcategories: "",
    });
    refClose.current.click();
    showAlert("Added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Add Items</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" name="category" value={note.category} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="subcategories" className="form-label">Subcategories</label>
                <input type="text" className="form-control" id="subcategories" name="subcategories" value={note.subcategories} onChange={onChange} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" ref={refClose} onClick={handleClick}>Add </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
