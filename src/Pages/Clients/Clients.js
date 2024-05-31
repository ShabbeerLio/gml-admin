import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Banner/NoteContext";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import Card from "../../Component/Card/Card";
import AddItems from "../../Component/AddItems/AddItems";
import EditItem2 from "../../Component/EditItem/EditItem2";

const Clients = (props) => {
  const context = useContext(NoteContext);
  const { notes, getClients, addClients, editClients, deleteClients } = context;
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState({
    id: "",
    ecategory: "",
    esubcategories: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      if (localStorage.getItem('token')) {
        await getClients();
        setLoading(false);
      } else {
        navigate("/login");
      }
    };
    fetchClients();
  }, [navigate, getClients]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      ecategory: currentNote.category,
      esubcategories: currentNote.subcategories.join(', '),
    });
  };

  const handleClick = (e) => {
    editClients(note.id, note.ecategory, note.esubcategories.split(',').map(sub => sub.trim()));
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="banner">
        <div className="banner-button">
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            ref={ref}
          >
            <MdAdd /> Add Languages
          </button>
        </div>
        <AddItems addItem={addClients} refClose={refClose} showAlert={props.showAlert} />
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
        </button>
        <EditItem2 onChange={onChange} note={note} refClose={refClose} handleClick={handleClick} />
        <div className="row my-3">
          <h2>Languages</h2>
          <div className="container mx-2">
            {loading ? "Loading..." : (notes.length === 0 && "No Items to display")}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
                <th scope="col">Subcategory</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => {
                return <Card key={note._id} index={index} deleteItem={deleteClients} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Clients;
