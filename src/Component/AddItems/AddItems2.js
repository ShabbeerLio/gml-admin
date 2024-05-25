import React, { useContext, useState } from 'react'
import "./AddItems.css"
import { MdAdd } from "react-icons/md";

const AddItems2 = (props) => {

    // const context = useContext(NoteContext);
    const { addItem } = props;

    const [note, setNote] = useState({ title: "", description: ""})

    const handleClick = (e) => {
        e.preventDefault();
        addItem(note.title, note.description);
        setNote({ title: "", description: "",})
        props.showAlert("Added successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

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
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name='title'
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        minLength={5}
                                        value={note.title}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Icon
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        name='description'
                                        id="description"
                                        onChange={onChange}
                                        minLength={5}
                                        value={note.description}
                                        required
                                    />
                                </div>
                                <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="AddNote-button" onClick={handleClick} data-bs-dismiss="modal" aria-label="Close" ref={props.refClose}>
                                    <MdAdd />Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddItems2