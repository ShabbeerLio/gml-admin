import React from "react";

const EditItem2 = ({ onChange, note, refClose, handleClick }) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              {/* <div className="mb-3">
                <label htmlFor="esubcategories" className="form-label">Subcategories</label>
                {note.esubcategories.map((subcategory, index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={`esubcategory-name-${index}`} className="form-label">Subcategory Name</label>
                    <input type="text" className="form-control" id={`esubcategory-name-${index}`} name="name" value={subcategory.name} readOnly />
                    <label htmlFor={`esubcategory-description-${index}`} className="form-label">Subcategory Description</label>
                    <input type="text" className="form-control" id={`esubcategory-description-${index}`} name="description" value={subcategory.description} readOnly />
                  </div>
                ))}
              </div> */}
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Client</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem2;
