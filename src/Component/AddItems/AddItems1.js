import React, { useState } from "react";

const AddItems1 = ({ addItem, refClose, showAlert }) => {
    const [note, setNote] = useState({
        category: "",
        subcategories: [{ name: "", description: "" }],
    });

    const handleClick = (e) => {
        e.preventDefault();
        addItem(note.category, note.subcategories);
        setNote({
            category: "",
            subcategories: [{ name: "", description: "" }],
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
            subcategories: [...note.subcategories, { name: "", description: "" }],
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
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" className="form-control" id="category" name="category" value={note.category} onChange={(e) => setNote({ ...note, category: e.target.value })} />
                            </div>
                            {note.subcategories.map((subcategory, index) => (
                                <div key={index} className="mb-3">
                                    <label htmlFor={`subcategory-name-${index}`} className="form-label">Subcategory Name</label>
                                    <input type="text" className="form-control" id={`subcategory-name-${index}`} name="name" value={subcategory.name} onChange={(e) => onChange(e, index, "name")} />
                                    <label htmlFor={`subcategory-description-${index}`} className="form-label">Subcategory Description</label>
                                    <textarea className="form-control" id={`subcategory-description-${index}`} name="description" value={subcategory.description} onChange={(e) => onChange(e, index, "description")} />
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

export default AddItems1;