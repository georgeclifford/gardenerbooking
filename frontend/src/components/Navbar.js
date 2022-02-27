import React, {Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

    const isLoggedin = props.isLoggedin;
    const [fname,setFName] = useState("");
    const [lname,setLName] = useState("");

    async function getName() {
        try {

            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            // console.log(parseRes);

            if(parseRes.user_type === "admin")
            {
                setFName("Admin");
                setLName("");
            }
    
            else if(parseRes.user_type === "customer"){
    
              setFName(parseRes.c_fname);
              setLName(parseRes.c_lname);
            }
            
        } catch (err) {

            console.error(err.message);
            
        }
    }

    useEffect(() => {
        getName();
    });

    function LoginButton() {

        if (isLoggedin) {
            return <Link to="/login" className="btn btn-outline-light btn-sm">{fname} {lname}</Link>
        }

        return <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid my-2">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="http://localhost:3000">Urban Gardener</a>
                    <div className="collapse navbar-collapse mx-3" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Balcony Gardener</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Flower Gardener</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Vegetable Gardener</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">About Us</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navbar;