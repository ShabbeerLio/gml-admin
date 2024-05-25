import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Banner/NoteContext";
import { useNavigate } from "react-router-dom";
import "./Banner.css"
import Card from "../../Component/Card/Card";
import AddItems from "../../Component/AddItems/AddItems";
import EditItem from "../../Component/EditItem/EditItem";
import { MdAdd } from "react-icons/md";


const Banner = (props) => {
    const context = useContext(NoteContext);
    const { notes,addNote, getNotes, editNote, deleteNote } = context;
    let history = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            history("/login")
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="banner">
                <div className="banner-button">
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        ref={ref}
                    >
                        <MdAdd /> Add Banner
                    </button>
                </div>
                <AddItems addItem={addNote} refClose={refClose} showAlert={props.showAlert} mode={props.mode} toggleMode={props.toggleMode} />
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    ref={ref}
                >
                </button>
                <EditItem onChange={onChange} note={note} refClose={refClose} handleClick={handleClick} />
                <div className="row my-3">
                    <h2>Banner</h2>
                    <div className="container mx-2">
                        {notes.length === 0 && "No Items to display"}
                    </div>
                    {notes.map((note) => {
                        return <Card key={note._id} updateNote={updateNote} deleteItem={deleteNote} showAlert={props.showAlert} note={note} mode={props.mode} toggleMode={props.toggleMode} />
                    })}
                </div>
            </div>
        </>
    );
};

export default Banner;