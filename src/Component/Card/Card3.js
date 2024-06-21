import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css";

const Card3 = ({ deleteItem, note, updateNote, showAlert }) => {
    if (!note) {
        return null; // or handle this case appropriately
    }

    const handleDelete = () => {
        deleteItem();
        showAlert("Deleted successfully", "success");
    };

    const handleEdit = () => {
        updateNote(note);
    };

    const getTruncatedDescription = (description) => {
        const words = description.split(" ");
        return words.length > 50 ? words.slice(0, 50).join(" ") + "..." : description;
    };

    return (
        <div className="col-md-3" style={{ color: "black" }}>
            <div className="card">
                <div className="card-title">
                    <h5>{note.name}</h5>
                    <p>{getTruncatedDescription(note.description)}</p>
                </div>
                <div className="card-buttons">
                    <p onClick={handleDelete} className="icon-button">
                        <MdDelete className="mx-2" />
                    </p>
                    <p onClick={handleEdit} className="icon-button">
                        <MdEdit className="mx-2" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card3;
