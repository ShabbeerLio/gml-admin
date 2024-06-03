import React, { useContext, useRef, useState } from "react";
import { MdDelete, MdEdit, MdCheck, MdAdd } from "react-icons/md";
import "./Subcategories.css"
import NoteContext from "../../Context/Banner/NoteContext";
import AddItems3 from "../AddItems/AddItems3";
import EditItem from "../EditItem/EditItem";
import Card3 from "../Card/Card3";

const Subcategories = ({ note, showAlert, props }) => {

    const ref = useRef(null);
    const refClose = useRef(null);

    const context = useContext(NoteContext);
    const { notes, addSubcategory, editSubcategory, deleteSubcategory } = context;

    console.log(notes, "Notes")
    console.log(note, "Note")

    return (
        <>
            <div>
                <div className="banner-button">
                    <h5>Subcategory</h5>
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        ref={ref}
                    >
                        <MdAdd /> Add Subcategories
                    </button>
                </div>
                <AddItems3 note={note} refClose={refClose} />
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    ref={ref}
                >
                </button>
                <EditItem note={note} refClose={refClose} />
                <div className="row my-3 mx-3">
                    <div className="container mx-2">
                        {note.subcategories === 0 && "No Items to display"}
                    </div>
                    {note.subcategories?.map((note) => {
                        return <Card3 key={note._id} deleteItem={deleteSubcategory} showAlert={showAlert} updateNote={editSubcategory} note={note} />
                    })}
                </div>
                {/* <ul>
                    {note.subcategories.map((sub, index) => (
                        <li key={index} className="sub-buttons my-2">
                            {editSubcategory === sub ? (
                                //     <input
                                //         required
                                //         type="text"
                                //         value={editedSubcategory}
                                //         onChange={(e) => setEditedSubcategory(e.target.value)}
                                //     />
                                // ) : (
                                sub
                            ) : (<></>)}
                            {editSubcategory === sub ? (
                                <p className="btn btn-success btn-sm ms-2" onClick={""}><MdCheck /></p>
                            ) : (
                                <p className="btn btn-primary btn-sm ms-5" onClick={editSubcategory}><MdEdit /></p>
                            )}
                            <p className="btn btn-danger btn-sm ms-2" onClick={deleteSubcategory}><MdDelete /></p>
                        </li>
                    ))}
                </ul> */}
                {/* <div className="input-group my-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="New Subcategory"
                    // value={newSubcategory}
                    // onChange={(e) => setNewSubcategory(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={addSubcategory}>Add Subcategory</button>
                </div> */}
            </div>
        </>
    );
};

export default Subcategories;
