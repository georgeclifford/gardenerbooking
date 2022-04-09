import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

import CustomerDashboard from './CustomerDashboard';
import StaffDashboard from './StaffDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({setAuth}) => {

    const [isActive,setActive] = useState("dashboard");

    const [inputs, setInputs] = useState({
        user_id: "",
        user_type: "",
        username: "",
        password: ""
      });

      const {user_id,user_type,username,password} = inputs;

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