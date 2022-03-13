import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

//Bootstrap icon imports
import { ReactComponent as Stop} from "bootstrap-icons/icons/slash-circle-fill.svg";
import { ReactComponent as Activate} from "bootstrap-icons/icons/check-circle-fill.svg";

const CustomerList = ({setAuth}) => {

    const [isActive,setActive] = useState("customerlist");

    const [data, setData] = useState([]);

    // Function for fetching Customer details
    async function getCustDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/custdetails", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            setData(parseRes);

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Customer deactivation function
    async function onDeac(user_id){

        try {

            const body = {user_id};
            
            const response = await fetch("http://localhost:5000/dashboard/deactivateuser",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if(parseRes === true) {

                toast.success("Action Successful!",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });

            } else {

                toast.error(parseRes,{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Date format function
    function formatDate(stringDate){
        var date=new Date(stringDate);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
    }

    useEffect(() => {
        getCustDetails();
    }, [0]);

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-9 col-md-9 col-sm-9 mx-auto">
                    <h1 className="mb-5 text-center">Customer Details</h1>
                    <Table hover responsive className="styled-table">
                        <thead className="bg-dark text-white">
                            <tr>
                            <th>Sl. No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                            <th>House</th>
                            <th>Street</th>
                            <th>District</th>
                            <th>Pin Code</th>
                            <th>Date Of Reg</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => (
                                
                                <tr key={item.cust_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.c_fname}</td>
                                    <td>{item.c_lname}</td>
                                    <td>{item.username}</td>
                                    <td>{item.c_phno}</td>
                                    <td>{item.c_house}</td>
                                    <td>{item.c_street}</td>
                                    <td>{item.c_dist}</td>
                                    <td>{item.c_pin}</td>
                                    <td>{formatDate(item.c_date)}</td>
                                    {
                                        item.l_status === "active"?
                                        <td><button className="btn btn-sm btn-danger" onClick={() => onDeac(item.user_id)} title="Deactivate"><Stop className="mt-n1" /></button></td>
                                        :
                                        <td><button className="btn btn-sm btn-success" onClick={() => onDeac(item.user_id)} title="Activate"><Activate className="mt-n1" /></button></td>
                                    }
                                </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        </Fragment>
    )
};

export default CustomerList;