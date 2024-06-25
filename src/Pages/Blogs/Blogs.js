import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Banner/NoteContext";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import Card from "../../Component/Card/Card";
import AddItems from "../../Component/AddItems/AddItems";
import EditItem2 from "../../Component/EditItem/EditItem2";
import BlogDetail from "../../Component/BlogDetail/BlogDetail";
import Card1 from "../../Component/Card/Card1";

const Clients = (props) => {
  const context = useContext(NoteContext);
  const { notes,  getBlogs,
    addBlogs,
    editBlogs,
    deleteBlogs} = context;
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({
    id: "",
    ecategory: "",
    esubcategories: [],
  });

  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      if (localStorage.getItem("token")) {
        await getBlogs();
        setLoading(false);
      } else {
        navigate("/login");
      }
    };
    fetchClients();
  }, [navigate, getBlogs]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      ecategory: currentNote.category,
      esubcategories: currentNote.subcategories,
    });
  };

  const handleClick = (e) => {
    editBlogs(note.id, note.ecategory, note.esubcategories);
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
          <h2>Blogs</h2>
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            ref={ref}
          >
            <MdAdd /> Add Blog
          </button>
        </div>
        <AddItems addItem={addBlogs} refClose={refClose} showAlert={props.showAlert} />
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
          <div className="container mx-2">
            {loading ? "Loading..." : (notes.length === 0 && "No Items to display")}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Heading</th>
                <th scope="col">Actions</th>
                <th scope="col">Blog Detail</th>
              </tr>
            </thead>
            <tbody>
              {notes && notes.map((note, index) => (
                note && <Card1
                  key={note._id}
                  index={index}
                  deleteItem={deleteBlogs}
                  updateNote={updateNote}
                  showAlert={props.showAlert}
                  note={note}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Clients;
