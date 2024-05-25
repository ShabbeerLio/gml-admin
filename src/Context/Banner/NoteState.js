import react from "react"
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:8000"

    const notesData = []

    const [notes, setNotes] = useState(notesData);

    
    // ....................................Banner..................................//
    // Get all Note
    const getNotes = async () => {
        // API Call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add Banner
    const addNote = async (title, description, tag) => {
        // API Call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // console.log("adding a new note")

    }

    // Edit Banner

    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete Banner
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
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

    // ................................. Welcome.......................................//

    // Get all Welcome
    const getWelcome = async () => {
        // API Call

        const response = await fetch(`${host}/api/welcome/fetchallwelcome`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add Welcome
    const addWelcome = async (title, description, tag) => {
        // API Call

        const response = await fetch(`${host}/api/welcome/addwelcome`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // console.log("adding a new note")

    }

    // Edit Welcome

    const editWelcome = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/welcome/updatewelcome/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete Welcome
    const deleteWelcome = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/welcome/deletewelcome/${id}`, {
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
    const addService = async (title, description, tag) => {
        // API Call

        const response = await fetch(`${host}/api/service/addservice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // console.log("adding a new note")

    }

    // Edit Services

    const editService = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/service/updateservice/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
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


    // ................................. Clients.......................................//
    // Get all Services
    const getClients = async () => {
        // API Call

        const response = await fetch(`${host}/api/clients/fetchallclients`, {
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
    const addClients = async (title, description, tag) => {
        // API Call

        const response = await fetch(`${host}/api/clients/addclients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        // console.log("adding a new note")

    }

    // Edit Services

    const editClients = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/clients/updateclients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete Services
    const deleteClients = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/clients/deleteclients/${id}`, {
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



    return (
        <NoteContext.Provider value={{
            notes,
            addNote,
            editNote,
            deleteNote,
            getNotes,
            getWelcome,
            addWelcome,
            editWelcome,
            deleteWelcome,
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