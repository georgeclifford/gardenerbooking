import React, {Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

    const isLoggedin = props.isLoggedin;
    const [fname,setFName] = useState("");
    const [lname,setLName] = useState("");
    const [data, setData] = useState([]);

    // Name fetch function
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

            else if(parseRes.user_type === "staff"){

                setFName(parseRes.s_fname);
                setLName(parseRes.s_lname);
            }
            
        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Category fetch function
    async function getCategoryDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/categorydisplay", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            setData(parseRes);

            // console.log(parseRes.token);


        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Function for setting content for login button
    function LoginButton() {

        if (isLoggedin) {
            return <Link to="/login" className="btn btn-outline-light btn-sm">{fname} {lname}</Link>
        }

        return <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
    }

    useEffect(() => {
        getName();
        getCategoryDetails();
    }, [0]);

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid my-2">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a className="navbar-brand" href="http://localhost:3000">Urban Gardener</a>

                    <div className="collapse navbar-collapse mx-3" id="navbarTogglerDemo03">

                        <ul className="navbar-nav me-auto mb-2 mx-3 gap-3 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>

                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">

                                    {
                                        data.map((item, index) => (

                                            <li key={item.cat_id}><a className="dropdown-item" href="#">{item.cat_name}</a></li>

                                        ))
                                    }

                                </ul>

                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
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