import React from 'react'

const EditItem = (props) => {
    return (
        <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header" style={{ borderBottom: "1px solid #3c3c3c" }}>
                            <h5 className="modal-title" id="exampleModalLabel" >
                                Edit Item
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Enter Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // style={{ color: "white", backgroundColor: "#424242", border: "none" }}
                                        id="etitle"
                                        name="etitle"
                                        aria-describedby="emailHelp"
                                        onChange={props.onChange}
                                        minLength={5}
                                        required
                                        value={props.note.etitle}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // style={{ color: "white", backgroundColor: "#424242", border: "none" }}
                                        name="edescription"
                                        id="edescription"
                                        onChange={props.onChange}
                                        minLength={5}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer" style={{ display: "flex", flexWrap: "nowrap", borderTop: "1px solid #3c3c3c" }}>
                            <button
                                ref={props.refClose}
                                type="button"
                                className="update-button"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                // disabled={props.note.etitle.length < 5 }
                                onClick={props.handleClick}
                                type="button"
                                className="update-button"
                                data-bs-dismiss="modal"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditItem
