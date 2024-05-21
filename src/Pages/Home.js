import React, { useContext, useEffect } from 'react'
import Login from '../Component/LogIn/Login'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Component/Sidebar/Sidebar';

const Home = () => {

    let history = useNavigate();
    // const context = useContext();
    // const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
        //   getNotes()
        }
        else {
          history("/login")
        }
        // eslint-disable-next-line
      }, []);
  return (
    <div>
        <Sidebar/>
    </div>
  )
}

export default Home
