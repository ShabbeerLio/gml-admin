import React, { useContext, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import "./Subcategories.css";
import NoteContext from "../../Context/Banner/NoteContext";
import AddItems3 from "../AddItems/AddItems3";
import EditItem from "../EditItem/EditItem";
import Card3 from "../Card/Card3";

const Subcategories = ({ note, showAlert }) => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const { addSubcategory, editSubcategory, deleteSubcategory } = useContext(NoteContext);
    const [editForm, setEditForm] = useState({ etitle: "", edescription: "" });
    const [currentSubcategoryId, setCurrentSubcategoryId] = useState(null);

    if (!note || !note.subcategories) {
        return <div>No Subcategories to display</div>;
    }

    const handleEditClick = (subNote) => {
        setCurrentSubcategoryId(subNote._id);
        setEditForm({ etitle: subNote.name, edescription: subNote.description });
        ref.current.click();  // Open the modal
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        if (currentSubcategoryId) {
            editSubcategory(note._id, currentSubcategoryId, editForm.etitle, editForm.edescription);
            showAlert("Subcategory updated successfully", "success");
        }
    };

    return (
        <>
            <div>
                <div className="banner-button">
                    <h5>Subcategory</h5>
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop1"
                        ref={ref}
                    >
                        <MdAdd /> Add Subcategories
                    </button>
                </div>
                <AddItems3 notes={note} addItem={addSubcategory} refClose={refClose} showAlert={showAlert} />
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    ref={ref}
                >
                </button>
                <EditItem
                    note={editForm}
                    onChange={handleChange}
                    handleClick={handleUpdate}
                    refClose={refClose}
                />
                <div className="row my-3 mx-3">
                    <div className="container mx-2">
                        {note.subcategories.length === 0 && "No Items to display"}
                    </div>
                    {note.subcategories.map((subNote) => (
                        <Card3
                            key={subNote._id}
                            deleteItem={() => {
                                deleteSubcategory(note._id, subNote._id);
                                showAlert("Deleted successfully", "success");
                            }}
                            showAlert={showAlert}
                            updateNote={handleEditClick}
                            note={subNote}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Subcategories;
