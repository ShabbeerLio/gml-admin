import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css";
import BlogDetail from "../BlogDetail/BlogDetail";

const Card1 = ({ note, index, deleteItem, updateNote, showAlert }) => {
    const [showSubcategories, setShowSubcategories] = useState(false);

    if (!note) {
        return null;
    }

    const handleViewClick = () => {
        setShowSubcategories(!showSubcategories);
    };

    function limitWords(text, limit) {
        const words = text?.split(' ');
        return words?.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    }

    return (
        <>
            <tr className="cards">
                <td>{index + 1}</td>
                <td>{limitWords(note.category, 5)}</td>
                <td>{limitWords(note.categorydesc, 5)}</td>
                <td>{limitWords(note.tag, 5)}</td>
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
                    <td colSpan="6">
                        <BlogDetail note={note} showAlert={showAlert} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default Card1;