import react from "react"
import NoteContext from "./NoteContext";
import { useState } from "react";
import host from "../../Host/Host";

const NoteState = (props) => {

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

    const addService = async (title, image) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);

        const response = await fetch(`${host}/api/service/addservice`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
            body: formData
        });

        const note = await response.json();
        setNotes(notes.concat(note));
        // console.log("adding a new note")
    }


    // Edit Services

    const editService = async (id, title, image) => {
        const formData = new FormData();
        formData.append('title', title);
        if (image) formData.append('image', image);

        const response = await fetch(`${host}/api/service/updateservice/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token')
            },
            body: formData
        });

        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                if (json.imageUrl) newNotes[index].imageUrl = json.imageUrl;
                break;
            }
        }
        setNotes(newNotes);
    };


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
    // Get all Languages
    const getClients = async () => {
        const response = await fetch(`${host}/api/clients/fetchallclients`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    };

    // Add Clients
    const addClients = async (category, subcategories) => {
        try {
            // Ensure subcategories is an array of objects with name and description
            const formattedSubcategories = subcategories.map(subcategory => ({
                name: subcategory.name,
                description: subcategory.description || '' // Add description if available
            }));

            const response = await fetch(`${host}/api/clients/addclients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ category, subcategories: formattedSubcategories })
            });

            if (!response.ok) {
                throw new Error('Failed to add client');
            }

            const client = await response.json();
            setNotes(prevNotes => [...prevNotes, client]);
            console.log("Client added successfully", "success");
        } catch (error) {
            console.error("Error adding client:", error.message);
            // showAlert("Failed to add client", "error");
        }
    };

    // Edit Clients
    const editClients = async (id, category, subcategories) => {
        try {
            // Ensure subcategories is an array of objects with name and description
            const formattedSubcategories = subcategories.map(sub => ({
                name: sub.name,
                description: sub.description || ''
            }));

            const response = await fetch(`${host}/api/clients/updateclients/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ category, subcategories: formattedSubcategories })
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit client');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === id ? updatedClient.client : note));
            console.log("Client edited successfully", "success");
        } catch (error) {
            console.error("Error editing client:", error.message);
            // showAlert("Failed to edit client", "error");
        }
    };

    // Delete Clients
    const deleteClients = async (id) => {
        try {
            const response = await fetch(`${host}/api/clients/deleteclients/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete client');
            }

            const deletedClient = await response.json();
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            console.log("Client deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting client:", error.message);
            // showAlert("Failed to delete client", "error");
        }
    };

    // Add Subcategory
    const addSubcategory = async (clientId, name, description) => {
        try {
            const response = await fetch(`${host}/api/clients/${clientId}/subcategories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ name, description })
            });

            if (!response.ok) {
                throw new Error('Failed to add subcategory');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === clientId ? updatedClient.client : note));
            console.log("Subcategory added successfully", "success");
        } catch (error) {
            console.error("Error adding subcategory:", error.message);
            // showAlert("Failed to add subcategory", "error");
        }
    };

    // Edit Subcategory
    const editSubcategory = async (clientId, subcategoryId, name, description) => {
        try {
            const response = await fetch(`${host}/api/clients/${clientId}/subcategories/${subcategoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ name, description })
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit subcategory');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === clientId ? updatedClient.client : note));
            console.log("Subcategory edited successfully", "success");
        } catch (error) {
            console.error("Error editing subcategory:", error.message);
            // showAlert("Failed to edit subcategory", "error");
        }
    };

    // Delete Subcategory
    const deleteSubcategory = async (clientId, subcategoryId) => {
        try {
            const response = await fetch(`${host}/api/clients/${clientId}/subcategories/${subcategoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete subcategory');
            }

            // Update state to remove the deleted subcategory
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === clientId
                        ? { ...note, subcategories: note.subcategories.filter(sub => sub._id !== subcategoryId) }
                        : note
                )
            );
        } catch (error) {
            console.error("Error deleting subcategory:", error.message);
            // showAlert("Failed to delete subcategory", "error");
        }
    };


    // ................................. Blogs.......................................//
    // Get all Blog 
    const getBlogs = async () => {
        const response = await fetch(`${host}/api/blog/fetchallblog`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    };

    // Add Blogs
    const addBlogs = async (category, subcategories, image) => {
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('image', image);
            formData.append('subcategories', JSON.stringify(subcategories));

            const response = await fetch(`${host}/api/blog/addblog`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            const blog = await response.json();
            setNotes(notes.concat(blog));
        } catch (error) {
            console.error("Error adding blog:", error.message);
        }
    };

    const editBlogs = async (id, category, subcategories, image) => {
        try {
            const formData = new FormData();
            formData.append('category', category);
            if (image) {
                formData.append('image', image);
            }
            formData.append('subcategories', JSON.stringify(subcategories));

            const response = await fetch(`${host}/api/blog/updateblog/${id}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            const json = await response.json();
            console.log(json);

            const updatedBlog = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === id ? updatedBlog.client : note));
            console.log("Blog edited successfully", "success");
        } catch (error) {
            console.error("Error editing blog:", error.message);
        }
    };

    const deleteBlogs = async (id) => {
        try {
            const response = await fetch(`${host}/api/blog/deleteblog/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete blog');
            }

            const deletedBlog = await response.json();
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            console.log("Blog deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting blog:", error.message);
        }
    };

    // Add Blog detail (Subcategory)
    const addBlogsSubcategory = async (clientId, name, description, imageFile) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('image', imageFile);

            const response = await fetch(`${host}/api/blog/${clientId}/subcategories`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add subcategory');
            }

            const updatedBlog = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === clientId ? updatedBlog.client : note));
            console.log("Subcategory added successfully", "success");
        } catch (error) {
            console.error("Error adding subcategory:", error.message);
        }
    };

    const editBlogsSubcategory = async (clientId, subcategoryId, name, description, imageFile) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await fetch(`${host}/api/blog/${clientId}/subcategories/${subcategoryId}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit subcategory');
            }

            const updatedBlog = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === clientId ? updatedBlog.client : note));
            console.log("Subcategory edited successfully", "success");
        } catch (error) {
            console.error("Error editing subcategory:", error.message);
        }
    };

    const deleteBlogsSubcategory = async (clientId, subcategoryId) => {
        try {
            const response = await fetch(`${host}/api/blog/${clientId}/subcategories/${subcategoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete subcategory');
            }

            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === clientId
                        ? { ...note, subcategories: note.subcategories.filter(sub => sub._id !== subcategoryId) }
                        : note
                )
            );
            console.log("Subcategory deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting subcategory:", error.message);
        }
    };


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
            addSubcategory,
            editSubcategory,
            deleteSubcategory,
            getBlogs,
            addBlogs,
            editBlogs,
            deleteBlogs,
            addBlogsSubcategory,
            editBlogsSubcategory,
            deleteBlogsSubcategory
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;