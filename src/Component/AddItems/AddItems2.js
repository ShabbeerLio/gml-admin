import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";
import "./AddItems.css";
import axios from "axios";

const AddItems2 = (props) => {
    const host = "http://localhost:8000";
    const { addItem } = props;
    const [note, setNote] = useState({ title: "", imageUrl: "" });
    const [image, setImage] = useState(null);
    const [imgFile, setImgFile] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(image)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        let imageUrl = note.imageUrl;

        if (image) {
            const formData = new FormData();
            for(var x = 0; x<image.length; x++) {
                formData.append('file', image[x])
            }
            axios.post("http://localhost:5000/public/upload", formData)
            .then(res => { 
                setImgFile('http://localhost:5000/public/images/'+res.formData.filename)
              })
            // formData.append('file', image);
            // const response = await fetch(`${host}/api/upload`, {
            //     method: 'POST',
            //     body: formData,
            // });

            // const data = await response.json();
            // imageUrl = data.url;
        }

        addItem(note.title, imageUrl);
        setNote({ title: "", imageUrl: "" });
        setImage(null);
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
