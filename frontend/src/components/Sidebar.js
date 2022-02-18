import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { ReactComponent as Person} from "bootstrap-icons/icons/person-square.svg";
import { ReactComponent as CreditCard} from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as Book} from "bootstrap-icons/icons/calendar2-check.svg";
import { ReactComponent as LgOut} from "bootstrap-icons/icons/box-arrow-left.svg";

const Sidebar = (props) => {

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
      props.setAuth(false);
      toast.success("Successfully Logged Out!");
    }

    useEffect(() => {
      getName();
    }, [0]);

    const isActive = props.isActive;

    return (
        <Fragment>
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" >
                <span class="fs-4">{fname} {lname}</span>
                <hr />
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        { isActive === "dashboard" ? 
                            <Link to="/dashboard" className="nav-link active sidebutton">
                                <Person className="mx-1 mt-n1" /> Profile
                            </Link>
                            :
                            <Link to="/dashboard" className="nav-link text-white sidebutton">
                                <Person className="mx-1 mt-n1" /> Profile
                            </Link>
                        }
                    </li>
                    <li>
                        { isActive === "cards" ? 
                            <Link to="/customercards" className="nav-link active sidebutton">
                               <CreditCard className="mx-1 mt-n1" /> Cards
                            </Link>
                            :
                            <Link to="/customercards" className="nav-link text-white sidebutton">
                               <CreditCard className="mx-1 mt-n1" /> Cards
                            </Link>
                        }
                    </li>
                    <li>
                        { isActive === "booking" ? 
                            <Link to="/customerbookings" className="nav-link active sidebutton">
                               <Book className="mx-1 mt-n1" /> Booking
                            </Link>
                            :
                            <Link to="/customerbookings" className="nav-link text-white sidebutton">
                               <Book className="mx-1 mt-n1" /> Booking
                            </Link>
                        }
                    </li>
                </ul>
                <hr />
                <button className="btn btn-outline-danger" onClick={e => logout(e)}><LgOut className="mx-1 mt-n1" /> Logout</button>
            </div>
        </Fragment>
    );
}

export default Sidebar;