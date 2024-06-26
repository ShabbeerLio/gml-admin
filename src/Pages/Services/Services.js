import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Banner/NoteContext";
import { useNavigate } from "react-router-dom";
import EditItem from "../../Component/EditItem/EditItem";
import { MdAdd } from "react-icons/md";
import AddItems2 from "../../Component/AddItems/AddItems2";
import Card2 from "../../Component/Card/Card2";

const Services = (props) => {
  const context = useContext(NoteContext);
  const { notes, getService, addService, editService, deleteService } = context;
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      if (localStorage.getItem("token")) {
        await getService();
        setLoading(false);
      } else {
        navigate("/login");
      }
    };
    fetchClients();
  }, [navigate, getService]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    eimage: null,
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      eimage: null,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editService(note.id, note.etitle, note.eimage);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setNote({ ...note, eimage: e.target.files[0] });
  };

  return (
    <>
      <div className="banner">
        <div className="banner-button">
          <h2>Services</h2>
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            ref={ref}
          >
            <MdAdd /> Add Service
          </button>
        </div>
        <AddItems2 addItem={addService} refClose={refClose} showAlert={props.showAlert} />
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          ref={ref}
        >
        </button>
        <EditItem
          onChange={onChange}
          note={note}
          refClose={refClose}
          handleClick={handleClick}
          onImageChange={onImageChange}
        />
        <div className="row my-3">
          <div className="container mx-2">
            {notes.length === 0 && "No Items to display"}
          </div>
          {notes.map((note) => {
            return <Card2 key={note._id} deleteItem={deleteService} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          })}
        </div>
      </div>
    </>
  );
};

export default Services;
