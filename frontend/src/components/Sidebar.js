import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Sidebar = ({setAuth}) => {

  const [fname,setFName] = useState("");
  const [lname,setLName] = useState("");

  async function getName() {
      try {

          const response = await fetch("http://localhost:5000/dashboard/", {
              method: "GET",
              headers: {token: localStorage.token}
          });

          const parseRes = await response.json();

        //   console.log(parseRes);

          setFName(parseRes.c_fname);
          setLName(parseRes.c_lname);
          
      } catch (err) {

          console.error(err.message);
          
      }
  }

    const logout = (e) =>{
      e.preventDefault();
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Successfully Logged Out!");
    }

    useEffect(() => {
      getName();
    });

    return (
        <Fragment>
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidewidth" >
                <span class="fs-4">{fname} {lname}</span>
                <hr />
                <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <Link to="/dashboard" className="nav-link active sidebutton">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/" class="nav-link text-white sidebutton">
                    Cards
                    </Link>
                </li>
                <li>
                    <Link to="/" class="nav-link text-white sidebutton">
                    Bookings
                    </Link>
                </li>
                </ul>
                <hr />
                <button className="btn btn-outline-danger" onClick={e => logout(e)}>Logout</button>
            </div>
        </Fragment>
    );
}

export default Sidebar;