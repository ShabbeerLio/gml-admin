import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";

const AddItems3 = (props) => {
    const { addItem } = props;
    const [note, setNote] = useState({ title: "", description: "" });
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(image)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        let description = note.description;
        addItem(note.title, description);
        setNote({ title: "", description: "" });
        props.showAlert("Added successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={props.refClose}></button>
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
                                <button disabled={note.title.length < 3} type="submit" className="AddNote-button" onClick={handleClick} data-bs-dismiss="modal" aria-label="Close" ref={props.refClose}>
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

export default AddItems3
