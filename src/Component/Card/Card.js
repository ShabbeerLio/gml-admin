import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css"

const Card = (props) => {
    const { deleteItem, note, updateNote } = props;

    return (
        <>
            <div className="col-md-3 " style={{ color: "black" }}>
                <div className="card">
                    <img src="https://static.vecteezy.com/system/resources/previews/040/813/021/non_2x/ai-generated-globe-and-coin-stack-symbolizing-money-makes-the-world-go-round-free-photo.jpg" alt="" />
                    <div className="card-title">
                        <h5>{note.title}</h5>
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

export default Card
