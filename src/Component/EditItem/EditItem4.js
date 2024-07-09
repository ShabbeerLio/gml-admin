import React from "react";

const EditItem4 = ({ onChange, note, refClose, handleClick }) => {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Page</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="epage" className="form-label">page</label>
                                <input type="text" className="form-control" id="epage" name="epage" value={note.epage} onChange={onChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Page</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditItem4;
