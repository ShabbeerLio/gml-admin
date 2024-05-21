import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./Component/LogIn/Login";
import Home from "./Pages/Home";
import { useState } from "react";
import Alert from "./Component/Alert/Alert";
import Sidebar from "./Component/Sidebar/Sidebar";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    {/* <NoteState> */}
        <Router>
          {/* <Sidebar /> */}
          <Alert alert={alert} />
            <Routes>
              <Route path="/" exact element={<Home showAlert={showAlert}/>} />
              <Route path="/login" exact element={<Login showAlert={showAlert}/>} />
             </Routes>
        </Router>
      {/* </NoteState> */}
    </>
  );
}

export default App;
