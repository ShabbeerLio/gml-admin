import react from "react"
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:8000"

    const notesData = []

    const [notes, setNotes] = useState(notesData);


    // ................................. Service.......................................//

    // Get all Services
    const getService = async () => {
        // API Call

        const response = await fetch(`${host}/api/service/fetchallservice`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add Services
    const addService = async (title) => {
        // API Call

        const response = await fetch(`${host}/api/service/addservice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // console.log("adding a new note")

    }

    // Edit Services

    const editService = async (id, title,) => {
        // API Call 
        const response = await fetch(`${host}/api/service/updateservice/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete Services
    const deleteService = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/service/deleteservice/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)

        console.log("deleting note with id" + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    // ................................. Languages.......................................//
    // Get all Clients
    const getClients = async () => {
        // API Call
        const response = await fetch(`${host}/api/clients/fetchallclients`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add Clients
    const addClients = async (category, subcategories) => {
        try {
            // Convert subcategories to array of objects
            const formattedSubcategories = subcategories.map(subcategory => ({
                name: subcategory,
                description: '' // You might want to add a description here if available
            }));

            // API Call
            const response = await fetch(`${host}/api/clients/addclients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ category, subcategories: formattedSubcategories })
            });
            const client = await response.json();
            setNotes(notes.concat(client));
            console.log("Client added successfully", "success");
        } catch (error) {
            console.error("Error adding client:", error.message);
            // showAlert("Failed to add client", "error");
        }
    }


    // Edit Clients
    const editClients = async (id, category, subcategories) => {
        try {
            // Format subcategories data as array of objects
            const formattedSubcategories = subcategories.map(sub => ({
                name: sub.name,
                description: sub.description || '' // Ensure description is provided or set to empty string
            }));

            // API Call 
            const response = await fetch(`${host}/api/clients/updateclients/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ category, subcategories: formattedSubcategories })
            });
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                let newNotes = JSON.parse(JSON.stringify(notes));
                // Logic to edit in client
                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];
                    if (element._id === id) {
                        newNotes[index].category = category;
                        newNotes[index].subcategories = subcategories;
                        break;
                    }
                }
                setNotes(newNotes);
            } else {
                // Handle error response
                console.error("Failed to edit client:", json.error);
            }
        } catch (error) {
            console.error("Error editing client:", error.message);
        }
    }


    // Delete Clients
    const deleteClients = async (id) => {
        try {
            // API Call
            const response = await fetch(`${host}/api/clients/deleteclients/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                console.log("deleting client with id " + id);
                const newNotes = notes.filter((note) => { return note._id !== id });
                setNotes(newNotes);
            } else {
                // Handle error response
                console.error("Failed to delete client:", json.error);
            }
        } catch (error) {
            console.error("Error deleting client:", error.message);
        }
    }


    return (
        <NoteContext.Provider value={{
            notes,
            getService,
            addService,
            editService,
            deleteService,
            getClients,
            addClients,
            editClients,
            deleteClients,
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;