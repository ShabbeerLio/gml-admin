import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Banner/NoteContext";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import Card from "../../Component/Card/Card";
import AddItems from "../../Component/AddItems/AddItems";
import EditItem2 from "../../Component/EditItem/EditItem2";
import AddItems4 from "../../Component/AddItems/AddItems4";
import Card4 from "../../Component/Card/Card4";
import EditItem4 from "../../Component/EditItem/EditItem4";

const Meta = (props) => {
    const context = useContext(NoteContext);
    const { notes,
        getMeta,
        addMeta,
        editMeta,
        deleteMeta, } = context;
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState({
        id: "",
        epage: "",
        esubcategories: [],
    });

    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            if (localStorage.getItem("token")) {
                await getMeta();
                setLoading(false);
            } else {
                navigate("/login");
            }
        };
        fetchClients();
    }, [navigate, getMeta]);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            epage: currentNote.page,
            esubcategories: currentNote.subcategories,
        });
    };

    const handleClick = (e) => {
        editMeta(note.id, note.epage, note.esubcategories);
        refClose.current.click();
        props.showAlert("Updated successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            {loading ? (
                <div className="loader">
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="banner">
                        <div className="banner-button">
                            <h2>Meta tags</h2>
                            <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                ref={ref}
                            >
                                <MdAdd /> Add Meta
                            </button>
                        </div>
                        <AddItems4 addItem={addMeta} refClose={refClose} showAlert={props.showAlert} />
                        <button
                            type="button"
                            className="btn btn-primary d-none"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            ref={ref}
                        >
                        </button>
                        <EditItem4 onChange={onChange} note={note} refClose={refClose} handleClick={handleClick} />
                        <div className="row my-3">
                            <div className="container mx-2">
                                {loading ? "Loading..." : (notes.length === 0 && "No Items to display")}
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Page</th>
                                        <th scope="col">Actions</th>
                                        <th scope="col">Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes && notes.map((note, index) => (
                                        note && <Card4
                                            key={note._id}
                                            index={index}
                                            deleteItem={deleteMeta}
                                            updateNote={updateNote}
                                            showAlert={props.showAlert}
                                            note={note}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>)}
        </>
    );
};

export default Meta;
