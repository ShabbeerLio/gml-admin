import React, { useState } from "react";
import Subcategories from "../Subcategories/Subcategories";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css";
import NoteContext from "../../Context/Banner/NoteContext";
import MetaSub from "../Subcategories/MetaSub";

const Card4 = ({ note, index, deleteItem, updateNote, showAlert }) => {
    const [showSubcategories, setShowSubcategories] = useState(false);

    if (!note) {
        return null; // Handle the case when note is undefined
    }

    const handleViewClick = () => {
        setShowSubcategories(!showSubcategories);
    };

    return (
        <>
            <tr className="cards">
                <td>{index + 1}</td>
                <td>{note.page}</td>
                <td>
                    <div className="card2-button">
                        <p onClick={() => updateNote(note)}><MdEdit /></p>
                        <p onClick={() => deleteItem(note._id)}><MdDelete /></p>
                    </div>
                </td>
                <td className="view">
                    <button className="btn btn-secondary" onClick={handleViewClick}>
                        {showSubcategories ? "Hide" : "View"}
                    </button>
                </td>
            </tr>
            {showSubcategories && (
                <tr className="full-width-row">
                    <td colSpan="4">
                        <MetaSub note={note} showAlert={showAlert} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default Card4;
