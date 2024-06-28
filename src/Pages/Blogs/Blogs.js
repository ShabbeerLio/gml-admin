import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Banner/NoteContext";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import EditItem1 from "../../Component/EditItem/EditItem1";
import Card1 from "../../Component/Card/Card1";
import AddItems1 from "../../Component/AddItems/AddItems1";

const Blogs = (props) => {
  const context = useContext(NoteContext);
  const { notes, getBlogs, addBlogs, editBlogs, deleteBlogs } = context;
  const [loading, setLoading] = useState(true);
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

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    ecategory: "",
    ecategorydesc: "",
    etag: "",
    esubcategories: [],
    eimage: null,
  });


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      ecategory: currentNote.category,
      ecategorydesc: currentNote.categorydesc,
      etag: currentNote.tag,
      esubcategories: currentNote.subcategories,
      eimage: null,
    });
  };

  const handleClick = (e) => {
    editBlogs(note.id, note.ecategory, note.ecategorydesc, note.etag, note.esubcategories ,note.eimage);
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
          <h2>Blog</h2>
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
        <AddItems1 addItem={addBlogs} refClose={refClose} showAlert={props.showAlert} />
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
        </button>
        <EditItem1 
        onChange={onChange} 
        note={note} 
        refClose={refClose} 
        handleClick={handleClick}
        onImageChange={onImageChange}
        />
        <div className="row my-3">
          <div className="container mx-2">
            {loading ? "Loading..." : (notes.length === 0 && "No Items to display")}
          </div>
          <table className="table">
            <thead>
              <tr className="blog">
                <th scope="col">S.No</th>
                <th scope="col">Blog</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
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

export default Blogs;