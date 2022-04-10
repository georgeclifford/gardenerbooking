import React, {Fragment, useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';


// Components

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Cards from './components/Cards';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Register from './components/Register';
import CategoryView from './components/CategoryView';
import Dashboard from './components/Dashboard';
import CustomerCards from './components/CustomerCards';
import CustomerBookings from './components/CustomerBookings';
import CustomerList from './components/CustomerList';
import Category from './components/Category';
import Bookings from './components/Bookings';
import Specializations from './components/Specializations';
import Allocations from './components/Allocations';

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
      <Navbar isLoggedin={isAuthenticated} />
          <Routes>
            <Route exact path="/" element = { <> <Carousel setAuth={!setAuth} /> <Cards setAuth={!setAuth} /> </> }/>
            <Route exact path="/categoryview" element = { <CategoryView isLoggedin={isAuthenticated} /> }/>
            <Route exact path="/aboutus" element = { <AboutUs /> }/>
            <Route exact path="/login" element = { !isAuthenticated ? ( <Login setAuth = {setAuth} /> ) : ( <Navigate to="/dashboard" /> )} />
            <Route exact path="/register" element = { !isAuthenticated ? ( <Register setAuth = {setAuth} /> ) : ( <Navigate to="/login" /> )} />
            <Route exact path="/dashboard" element = { isAuthenticated ? ( <Dashboard setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
            <Route exact path="/customercards" element = { isAuthenticated ? ( <CustomerCards setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
            <Route exact path="/customerbookings" element = { isAuthenticated ? ( <CustomerBookings setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
            <Route exact path="/customerlist" element = { isAuthenticated ? ( <CustomerList setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
            <Route exact path="/category" element = { isAuthenticated ? ( <Category setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
            <Route exact path="/bookings" element = { isAuthenticated ? ( <Bookings setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
            <Route exact path="/specializations" element = { isAuthenticated ? ( <Specializations setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
            <Route exact path="/allocations" element = { isAuthenticated ? ( <Allocations setAuth = {setAuth} /> ) : ( <Login setAuth = {setAuth} /> )} />
          </Routes>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
