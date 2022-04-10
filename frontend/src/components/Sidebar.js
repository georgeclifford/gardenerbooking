import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Bootstrap icon imports
import { ReactComponent as Person} from "bootstrap-icons/icons/person-square.svg";
import { ReactComponent as CreditCard} from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as Book} from "bootstrap-icons/icons/calendar2-check.svg";
import { ReactComponent as LgOut} from "bootstrap-icons/icons/box-arrow-left.svg";
import { ReactComponent as People} from "bootstrap-icons/icons/people.svg";
import { ReactComponent as Category} from "bootstrap-icons/icons/list-ul.svg";
import { ReactComponent as Report} from "bootstrap-icons/icons/graph-up-arrow.svg";
import { ReactComponent as Feedback} from "bootstrap-icons/icons/pencil-square.svg";
import { ReactComponent as Check} from "bootstrap-icons/icons/patch-check.svg";
import { ReactComponent as Work} from "bootstrap-icons/icons/geo-alt.svg";

const Sidebar = (props) => {

  const [fname,setFName] = useState("");
  const [lname,setLName] = useState("");
  const [user_type,setUserType] = useState("");

  // Fetch Name of the user function
  async function getDetails() {
      try {

          const response = await fetch("http://localhost:5000/dashboard/", {
              method: "GET",
              headers: {token: localStorage.token}
          });

          const parseRes = await response.json();

        //   console.log(parseRes);

        setUserType(parseRes.user_type);

        if(parseRes.user_type === "admin")
        {
            setFName("Admin");
            setLName("Dashboard");
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

    // Logout Funtion
    const logout = (e) =>{
      e.preventDefault();
      sessionStorage.removeItem("tab");
      localStorage.removeItem("token");
      props.setAuth(false);
      toast.success("Successfully Logged Out!",{
        position: toast.POSITION.BOTTOM_RIGHT
    });
    }

    useEffect(() => {
      getDetails();
    }, [0]);

    const isActive = props.isActive;

        return (
            <Fragment>
                <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" >
                    <span className="fs-4">{fname} {lname}</span>
                    <hr />

                    {
                        user_type === "admin" ?

                        // Admin Sidebar

                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
                                    { isActive === "dashboard" ? 
                                        <Link to="/dashboard" className="nav-link active button">
                                            <Person className="mx-1 mt-n1" /> Staff
                                        </Link>
                                        :
                                        <Link to="/dashboard" className="nav-link text-white button">
                                            <Person className="mx-1 mt-n1" /> Staff
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "customerlist" ? 
                                        <Link to="/customerlist" className="nav-link active button">
                                        <People className="mx-1 mt-n1" /> Customer
                                        </Link>
                                        :
                                        <Link to="/customerlist" className="nav-link text-white button">
                                        <People className="mx-1 mt-n1" /> Customer
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "category" ? 
                                        <Link to="/category" className="nav-link active button">
                                        <Category className="mx-1 mt-n1" /> Category
                                        </Link>
                                        :
                                        <Link to="/category" className="nav-link text-white button">
                                        <Category className="mx-1 mt-n1" /> Category
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "bookings" ? 
                                        <Link to="/bookings" className="nav-link active button">
                                        <Book className="mx-1 mt-n1" /> Bookings
                                        </Link>
                                        :
                                        <Link to="/bookings" className="nav-link text-white button">
                                        <Book className="mx-1 mt-n1" /> Bookings
                                        </Link>
                                    }
                                </li>
                            </ul>
                        
                        : user_type === "customer" ?

                        //Customer Sidebar

                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
                                    { isActive === "dashboard" ? 
                                        <Link to="/dashboard" className="nav-link active button">
                                            <Person className="mx-1 mt-n1" /> Profile
                                        </Link>
                                        :
                                        <Link to="/dashboard" className="nav-link text-white button">
                                            <Person className="mx-1 mt-n1" /> Profile
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "cards" ? 
                                        <Link to="/customercards" className="nav-link active button">
                                        <CreditCard className="mx-1 mt-n1" /> Cards
                                        </Link>
                                        :
                                        <Link to="/customercards" className="nav-link text-white button">
                                        <CreditCard className="mx-1 mt-n1" /> Cards
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "booking" ? 
                                        <Link to="/customerbookings" className="nav-link active button">
                                        <Book className="mx-1 mt-n1" /> Booking
                                        </Link>
                                        :
                                        <Link to="/customerbookings" className="nav-link text-white button">
                                        <Book className="mx-1 mt-n1" /> Booking
                                        </Link>
                                    }
                                </li>
                            </ul>

                        : user_type === "staff" ?

                        // Staff Sidebar

                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
                                    { isActive === "dashboard" ? 
                                        <Link to="/dashboard" className="nav-link active button">
                                            <Person className="mx-1 mt-n1" /> Profile
                                        </Link>
                                        :
                                        <Link to="/dashboard" className="nav-link text-white button">
                                            <Person className="mx-1 mt-n1" /> Profile
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "specializations" ? 
                                        <Link to="/specializations" className="nav-link active button">
                                        <Check className="mx-1 mt-n1" /> Specializations
                                        </Link>
                                        :
                                        <Link to="/specializations" className="nav-link text-white button">
                                        <Check className="mx-1 mt-n1" /> Specializations
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "allocations" ? 
                                        <Link to="/allocations" className="nav-link active button">
                                        <Work className="mx-1 mt-n1" /> Allocations
                                        </Link>
                                        :
                                        <Link to="/allocations" className="nav-link text-white button">
                                        <Work className="mx-1 mt-n1" /> Allocations
                                        </Link>
                                    }
                                </li>
                            
                            </ul>

                            :

                            <p className="m-auto text-muted"> </p>

                    }

                    <hr />
                    <button className="btn btn-outline-danger" onClick={e => logout(e)}><LgOut className="mx-1 mt-n1" /> Logout</button>
                </div>
            </Fragment>
        );

    
}

export default Sidebar;