import React, { useContext, useState } from "react";
import Subcategories from "../Subcategories/Subcategories";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css"
import Card3 from "./Card3";
import NoteContext from "../../Context/Banner/NoteContext";

const Card = ({ note, index, deleteItem, updateNote, showAlert }) => {

    const context = useContext(NoteContext);
    const { addSubcategory, editSubcategory, deleteSubcategory } = context;
    const [showSubcategories, setShowSubcategories] = useState(false);

    const handleViewClick = () => {
        setShowSubcategories(!showSubcategories);
    };

    return (
        <>
            <tr className="cards">
                <td>{index + 1}</td>
                <td>{note.category}</td>
                <td>
                    <div className="card2-button">
                        <p onClick={() => updateNote(note)}><MdEdit /></p>
                        <p onClick={() => deleteItem(note._id)}><MdDelete /></p>
                    </div>
                </td>
                <td className="view ">
                    <button className="btn btn-secondary" onClick={handleViewClick}>
                        {showSubcategories ? "Hide" : "View"}
                    </button>
                </td>
            </tr>
            {showSubcategories && (
                <>
                    <tr className="full-width-row">
                        <td colspan="4">
                            <Subcategories note={note} showAlert={showAlert} />
                        </td>
                    </tr>
                </>
            )}
        </>
    );
};

export default Card;
