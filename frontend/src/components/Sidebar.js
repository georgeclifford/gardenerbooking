import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

    const logout = (e) =>{
      e.preventDefault();
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

                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
                                    { isActive === "dashboard" ? 
                                        <Link to="/dashboard" className="nav-link active sidebutton">
                                            <Person className="mx-1 mt-n1" /> Staff
                                        </Link>
                                        :
                                        <Link to="/dashboard" className="nav-link text-white sidebutton">
                                            <Person className="mx-1 mt-n1" /> Staff
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "customerlist" ? 
                                        <Link to="#" className="nav-link active sidebutton">
                                        <People className="mx-1 mt-n1" /> Customer
                                        </Link>
                                        :
                                        <Link to="#" className="nav-link text-white sidebutton">
                                        <People className="mx-1 mt-n1" /> Customer
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "category" ? 
                                        <Link to="#" className="nav-link active sidebutton">
                                        <Category className="mx-1 mt-n1" /> Category
                                        </Link>
                                        :
                                        <Link to="#" className="nav-link text-white sidebutton">
                                        <Category className="mx-1 mt-n1" /> Catgeory
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "bookings" ? 
                                        <Link to="#" className="nav-link active sidebutton">
                                        <Book className="mx-1 mt-n1" /> Bookings
                                        </Link>
                                        :
                                        <Link to="#" className="nav-link text-white sidebutton">
                                        <Book className="mx-1 mt-n1" /> Bookings
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "report" ? 
                                        <Link to="#" className="nav-link active sidebutton">
                                        <Report className="mx-1 mt-n1" /> Report
                                        </Link>
                                        :
                                        <Link to="#" className="nav-link text-white sidebutton">
                                        <Report className="mx-1 mt-n1" /> Report
                                        </Link>
                                    }
                                </li>
                            </ul>
                        
                        : user_type === "customer" ?

                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
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

                        :

                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
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
                                    { isActive === "specializations" ? 
                                        <Link to="#" className="nav-link active sidebutton">
                                        <Check className="mx-1 mt-n1" /> Specializations
                                        </Link>
                                        :
                                        <Link to="#" className="nav-link text-white sidebutton">
                                        <Check className="mx-1 mt-n1" /> Specializations
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "allocations" ? 
                                        <Link to="#" className="nav-link active sidebutton">
                                        <Work className="mx-1 mt-n1" /> Allocations
                                        </Link>
                                        :
                                        <Link to="#" className="nav-link text-white sidebutton">
                                        <Work className="mx-1 mt-n1" /> Allocations
                                        </Link>
                                    }
                                </li>
                                <li>
                                    { isActive === "feedbacks" ? 
                                        <Link to="#" className="nav-link active sidebutton">
                                        <Feedback className="mx-1 mt-n1" /> Feedbacks
                                        </Link>
                                        :
                                        <Link to="#" className="nav-link text-white sidebutton">
                                        <Feedback className="mx-1 mt-n1" /> Feedbacks
                                        </Link>
                                    }
                                </li>
                            </ul>

                    }

                    <hr />
                    <button className="btn btn-outline-danger" onClick={e => logout(e)}><LgOut className="mx-1 mt-n1" /> Logout</button>
                </div>
            </Fragment>
        );

    
}

export default Sidebar;