import React, { useState } from "react";
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";
import "./Subcategories.css"

const Subcategories = ({ note, showAlert }) => {

    const host = "http://localhost:8000";
    const [subcategories, setSubcategories] = useState(note.subcategories);
    const [newSubcategory, setNewSubcategory] = useState("");
    const [editSubcategory, setEditSubcategory] = useState(null);
    const [editedSubcategory, setEditedSubcategory] = useState("");

    // console.log(subcategories)

    const handleAddSubcategory = async () => {
        try {
            const response = await fetch(`${host}/api/clients/${note._id}/subcategories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subcategory: newSubcategory }),
            });
            const data = await response.json();
            if (response.ok) {
                setSubcategories([...subcategories, data.subcategory]);
                setNewSubcategory("");
                showAlert("Subcategory added successfully", "success");
            } else {
                showAlert(data.error, "danger");
            }
        } catch (error) {
            console.error("Error adding subcategory:", error);
            showAlert("An error occurred while adding subcategory", "danger");
        }
    };

    const handleDeleteSubcategory = async (subcategory) => {
        try {
            const response = await fetch(`${host}/api/clients/${note._id}/subcategories/${subcategory}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                setSubcategories(subcategories.filter(sub => sub !== subcategory));
                showAlert("Subcategory deleted successfully", "success");
            } else {
                showAlert(data.error, "danger");
            }
        } catch (error) {
            console.error("Error deleting subcategory:", error);
            showAlert("An error occurred while deleting subcategory", "danger");
        }
    };

    const handleEditSubcategory = (subcategory) => {
        setEditSubcategory(subcategory);
        setEditedSubcategory(subcategory);
    };

    const handleSaveEditSubcategory = async () => {
        try {
            const response = await fetch(`${host}/api/clients/${note._id}/subcategories/${editSubcategory}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subcategory: editedSubcategory }),
            });
            const data = await response.json();
            if (response.ok) {
                setSubcategories(subcategories.map(sub => sub === editSubcategory ? editedSubcategory : sub));
                setEditSubcategory(null);
                setEditedSubcategory("");
                showAlert("Subcategory edited successfully", "success");
            } else {
                showAlert(data.error, "danger");
            }
        } catch (error) {
            console.error("Error editing subcategory:", error);
            showAlert("An error occurred while editing subcategory", "danger");
        }
    };

    return (
        <div>
            <h5>Subcategories</h5>
            <ul>
                {subcategories.map((sub, index) => (
                    <li key={index} className="sub-buttons my-2">
                        {editSubcategory === sub ? (
                            <input
                                required
                                type="text"
                                value={editedSubcategory}
                                onChange={(e) => setEditedSubcategory(e.target.value)}
                            />
                        ) : (
                            sub
                        )}
                        {editSubcategory === sub ? (
                            <p className="btn btn-success btn-sm ms-2" onClick={handleSaveEditSubcategory}><MdCheck /></p>
                        ) : (
                            <p className="btn btn-primary btn-sm ms-5" onClick={() => handleEditSubcategory(sub)}><MdEdit /></p>
                        )}
                        <p className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteSubcategory(sub)}><MdDelete /></p>
                    </li>
                ))}
            </ul>
            <div className="input-group my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="New Subcategory"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddSubcategory}>Add Subcategory</button>
            </div>
        </div>
    );
};

export default Subcategories;
