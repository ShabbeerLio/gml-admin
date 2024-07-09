import React, { useState } from "react";

const AddItems4 = ({ addItem, refClose, showAlert }) => {
  const [note, setNote] = useState({
    page: "",
    subcategories: [{ title: "", description: "" }],
  });

  const handleClick = (e) => {
    e.preventDefault();
    addItem(note.page, note.subcategories);
    setNote({
      page: "",
      subcategories: [{ title: "", description: "" }],
    });
    refClose.current.click();
    showAlert("Added successfully", "success");
  };

  const onChange = (e, index, field) => {
    const newSubcategories = [...note.subcategories];
    newSubcategories[index][field] = e.target.value;
    setNote({ ...note, subcategories: newSubcategories });
  };

  const addSubcategoryField = () => {
    setNote({
      ...note,
      subcategories: [...note.subcategories, { title: "", description: "" }],
    });
  };

  const removeSubcategoryField = (index) => {
    const newSubcategories = note.subcategories.filter((_, i) => i !== index);
    setNote({ ...note, subcategories: newSubcategories });
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
                <label htmlFor="page" className="form-label">Page</label>
                <input type="text" className="form-control" id="page" name="page" value={note.page} onChange={(e) => setNote({ ...note, page: e.target.value })} />
              </div>
              {note.subcategories.map((subcategory, index) => (
                <div key={index} className="mb-3">
                  <label htmlFor={`subcategory-name-${index}`} className="form-label">Title</label>
                  <input type="text" className="form-control" id={`subcategory-name-${index}`} name="title" value={subcategory.title} onChange={(e) => onChange(e, index, "title")} />
                  <label htmlFor={`subcategory-description-${index}`} className="form-label"> Description</label>
                  <textarea  className="form-control" id={`subcategory-description-${index}`} name="description" value={subcategory.description} onChange={(e) => onChange(e, index, "description")} />
                  <button type="button" className="btn btn-danger mt-2" onClick={() => removeSubcategoryField(index)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn btn-primary mt-2" onClick={addSubcategoryField}>Add Subcategory</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" ref={refClose} onClick={handleClick}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems4;
