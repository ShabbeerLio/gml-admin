import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";

const AddItems3 = ({ addItem, showAlert ,notes ,refClose}) => {
    // const { addItem, showAlert ,notes ,refClose} = props;
    const [note, setNote] = useState({ title: "", description: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        const { title, description } = note;
        addItem(notes._id,title, description); // Pass title and description to addItem
        setNote({ title: "", description: "" }); // Clear input fields
        // props.refClose.current.click(); // Close modal
        showAlert("Added successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name='title'
                                        aria-describedby="titleHelp"
                                        onChange={onChange}
                                        value={note.title}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        // type="text"
                                        className="form-control"
                                        id="description"
                                        name='description'
                                        aria-describedby="descriptionHelp"
                                        onChange={onChange}
                                        value={note.description}
                                        required
                                    />
                                </div>
                                <button disabled={note.title.length < 3} type="submit" className="AddNote-button"  data-bs-dismiss="modal" onClick={handleClick} aria-label="Close" ref={refClose}>
                                    <MdAdd /> Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddItems3;
