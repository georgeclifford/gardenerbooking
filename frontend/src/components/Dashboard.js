import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
// import Sidebar from "./Sidebar";

const Dashboard = ({setAuth}) => {

    const [fname,setFName] = useState("");
    const [lname,setLName] = useState("");

    async function getName() {
        try {

            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            console.log(parseRes);

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
            {/* <Sidebar /> */}
            <div className="pad1">
                <h1>Welcome {fname} {lname} </h1>
                <button className="btn btn-outline-danger" onClick={e => logout(e)}>Logout</button>
            </div>
        </Fragment>
    )
};

export default Dashboard;