import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./Component/LogIn/Login";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Alert from "./Component/Alert/Alert";
import SidebarNav from "./Component/Sidebar/SidebarNav";
import Topbar from "./Component/Sidebar/Topbar";
import Banner from "./Pages/Banner/Banner";
import Welcome from "./Pages/Welcome/Welcome";
import Services from "./Pages/Services/Services";
import Clients from "./Pages/Clients/Clients";
import NoteState from "./Context/Banner/NoteState";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
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
      <NoteState>
      <Router>
        <CssBaseline />
        <div className="App">
          <SidebarNav isSidebar={isSidebar} />
          <div className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Alert alert={alert} />
            <Routes>
              <Route path="/login" exact element={<Login showAlert={showAlert} />} />
              <Route path="/" exact element={<Banner showAlert={showAlert} />} />
              <Route path="/welcome-to" exact element={<Welcome showAlert={showAlert} />} />
              <Route path="/our-services" exact element={<Services showAlert={showAlert} />} />
              <Route path="/clients" exact element={<Clients showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
