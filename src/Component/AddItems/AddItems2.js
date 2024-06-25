import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";
import "./AddItems.css";
import axios from "axios";

const AddItems2 = (props) => {
    const { addItem } = props;
    const [note, setNote] = useState({ title: "", image: null });

    const handleImageChange = (e) => {
        setNote({
            ...note,
            image: e.target.files[0]
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        console.log(formData,"data")
        formData.append("title", note.title);
        formData.append("image", note.image);

        try {
            const response = await axios.post('http://localhost:8000/api/service/addservice', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('token')
                }
            });

            const savedNote = response.data;
            addItem(savedNote.title, savedNote.imageUrl);
            setNote({ title: "", image: null });
            props.showAlert("Added successfully", "success");
        } catch (error) {
            console.error("There was an error uploading the file!", error);
        }
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
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
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

export default AddItems2;
