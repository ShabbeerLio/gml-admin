import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css"

const Card3 = (props) => {
    const { deleteItem, note, updateNote } = props;
    console.log(note,"data")

    return (
        <>
            <div className="col-md-3 " style={{ color: "black" }}>
                <div className="card">
                    <div className="card-title">
                        <h5>{note.name}</h5>
                        <p>{note.description}</p>
                    </div>
                    <div className="card-buttons">
                        <p onClick={() => { deleteItem(note._id); props.showAlert("Deleted successfully", "success"); }} ><MdDelete className="mx-2" /></p>
                        <p onClick={() => { updateNote(note) }} ><MdEdit className="mx-2" /></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card3
