import React, { useState } from "react";

const EditItem1 = ({ onChange, note, refClose, handleClick }) => {
    const handleImageChange = (e) => {
        onChange({ target: { name: 'image', value: e.target.files[0] } });
    };
    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Client</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="ecategory" className="form-label">Category</label>
                                <input type="text" className="form-control" id="ecategory" name="ecategory" value={note.ecategory} onChange={onChange} />
                            </div>
                            {note.esubcategories.map((subcategory, index) => (
                                <div key={index}>
                                    <div className="mb-3">
                                        <label htmlFor={`esubcategoryName${index}`} className="form-label">Subcategory Name</label>
                                        <input type="text" className="form-control" id={`esubcategoryName${index}`} name="name" value={subcategory.name} onChange={(e) => onChange({ target: { name: `esubcategories[${index}].name`, value: e.target.value } })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`esubcategoryDescription${index}`} className="form-label">Subcategory Description</label>
                                        <input type="text" className="form-control" id={`esubcategoryDescription${index}`} name="description" value={subcategory.description} onChange={(e) => onChange({ target: { name: `esubcategories[${index}].description`, value: e.target.value } })} />
                                    </div>
                                </div>
                            ))}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                            <button type="button" className="btn btn-secondary" ref={refClose}>Close</button>
                        </form>
                    </div>
                    {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Client</button>
          </div> */}
                </div>
            </div>
        </div>
    );
};

export default EditItem1;
