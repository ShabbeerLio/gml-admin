import { useContext, useEffect, useRef, useState } from "react";
import AddItems1 from "../../Component/AddItems/AddItems1";
import EditItem1 from "../../Component/EditItem/EditItem1";
import NoteContext from "../../Context/Banner/NoteContext";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Card1 from "../../Component/Card/Card1";

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
    esubcategories: [],
    eimage: null,
  });


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      ecategory: currentNote.category,
      esubcategories: currentNote.subcategories,
      eimage: null,
    });
  };

  const handleClick = (e) => {
    editBlogs(note.id, note.ecategory, note.esubcategories, note.eimage);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    if (e.target.name === 'image') {
      setNote({ ...note, image: e.target.files[0] });
    } else {
      setNote({ ...note, [e.target.name]: e.target.value });
    }
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
        <AddItems1 addItem={addBlogs} refClose={refClose} showAlert={props.showAlert} />
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
        </button>
        <EditItem1 onChange={onChange} note={note} refClose={refClose} handleClick={handleClick} />
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

export default Blogs;
