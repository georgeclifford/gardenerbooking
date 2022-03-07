import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

const CustomerList = ({setAuth}) => {

    const [isActive,setActive] = useState("customerlist");

    const [data, setData] = useState([]);

    async function getCustDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/custdetails", {
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
                    <Table bordered hover responsive className="wide">
                        <thead>
                            <tr>
                            <th>Sl. No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>House</th>
                            <th>Street</th>
                            <th>District</th>
                            <th>Pin Code</th>
                            <th>Date Of Registration</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => ( // access directly from array
                                
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
                                    <td className="text-center"><button className="btn btn-sm btn-outline-danger">Deactivate</button></td>
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