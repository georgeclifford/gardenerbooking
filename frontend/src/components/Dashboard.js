import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

import CustomerDashboard from './CustomerDashboard';
import StaffDashboard from './StaffDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({setAuth}) => {

    const [isActive,setActive] = useState("dashboard");

    const [inputs, setInputs] = useState({
        user_type: "",
        username: "",
        password: ""
      });

      const {user_id,user_type,username,password} = inputs;
    
      const onChange = (e) => {
          setInputs({...inputs,[e.target.name] : e.target.value});
      }

    // Function for fetching Customer/Staff/Admin panel details
    async function getDetails() {
        try {

            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

                setInputs({...inputs, 
                    user_id: parseRes.user_id,
                    user_type: parseRes.user_type,
                    username: parseRes.username,
                    password: parseRes.password
                });
            
        } catch (err) {

            console.error(err.message);
            
        }
    }

    useEffect(() => {

        if (sessionStorage.getItem("msg")) {
            if(sessionStorage.getItem("msg") === 'deac'){
                toast.success("Action Successful!",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg");                
            }
            else if(sessionStorage.getItem("msg") === 'logout'){
                toast.success("Logged Out Successfully",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg"); 
            }
            else if(sessionStorage.getItem("msg") === 'login'){
                toast.success("Logged In Successfully",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg"); 
            }
            else if(sessionStorage.getItem("msg") === 'register'){
                toast.success("Registered Successfully",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg"); 
            }
            else if(sessionStorage.getItem("msg") === 'add'){
                toast.success("Added Successfully",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg"); 
            }
            else if(sessionStorage.getItem("msg") === 'update'){
                toast.success("Updated Successfully",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg"); 
            }
            else{
                toast.error(sessionStorage.getItem("msg"),{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg");
                
            }

        }

        getDetails();

    }, [0]);

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive}/>

                {
                    user_type === "admin" ?

                    // Admin panel

                        <AdminDashboard />

                    : user_type === "customer" ?

                    // Customer panel

                        <CustomerDashboard />

                    : user_type === "staff" ?

                    // Staff panel

                        <StaffDashboard />

                        :
                        
                        <p className="m-auto text-muted"> </p>

                }

                
            </div>

        </Fragment>
    )
};

export default Dashboard;