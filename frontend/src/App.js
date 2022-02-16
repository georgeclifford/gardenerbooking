import React, {Fragment, useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';

//components

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Cards from './components/Cards';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {

      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();

      //console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
    } catch (err) {

      console.error(err.message);
      
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <Router>
      <Navbar isAuth={isAuthenticated} />
          <Routes>
            <Route exact path="/" element = { <> <Carousel setAuth={!setAuth} /> <Cards setAuth={!setAuth} /> </> }/>
            <Route exact path="/login" element = { !isAuthenticated ? ( <Login setAuth = {setAuth} /> ) : ( <Navigate to="/dashboard" /> )} />
            <Route exact path="/register" element = { !isAuthenticated ? ( <Register setAuth = {setAuth} /> ) : ( <Navigate to="/login" /> )} />
            <Route exact path="/dashboard" element = { isAuthenticated ? ( <Dashboard setAuth = {setAuth} /> ) : ( <Navigate to="/login" /> )} />
          </Routes>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
