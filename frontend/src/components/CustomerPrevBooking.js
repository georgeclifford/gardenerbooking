import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";

const CustomerPrevBooking = () => {

    const [data, setData] = useState([]);

    const serverBaseURI = 'http://localhost:5000'


    // function to set tab
    function setTab(tab){

        sessionStorage.setItem('tab', tab);
        window.location.reload(true);

    }


    // Function for fetching completed work details
    async function getDetails() {
        try {

            const response = await fetch("http://localhost:5000/dashboard/completedwork", {
                method: "GET",
                headers: {token: localStorage.token, user_id: localStorage.user_id}
            });

            const parseRes = await response.json();

            setData(parseRes);

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

        getDetails();

    }, [0]);

    return (
        <Fragment>
                    <div className="card border-secondary">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item">
                                    <a className="nav-link text-dark button" onClick={() => setTab("work pending")} aria-current="true" href="#">Work Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button mx-2" onClick={() => setTab("payment pending")} href="#">Payment Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active button" onClick={() => setTab("prev work")} href="#">Completed & Paid Works</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button mx-2" onClick={() => setTab("cancelled")} href="#">Cancelled Bookings</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <table>

                            <tbody>
                                    {
                                    data.map((item, index) => (
                                        
                                        <tr key={item.bmaster_id} className="list-group-item">

                                            <td scope="row">
                                                <p>Booking ID: {item.bmaster_id}</p>
                                            </td>

                                            <td className="col-3">
                                                <img className="img mt-3" src={`${serverBaseURI}/images/${item.cat_image}`}/>
                                                <p className="mt-2">{item.cat_name}</p>
                                            </td>

                                            <td className="col-2">
                                                <p>Advance Paid: Rs. {item.tot_amt / item.bc_hours}</p>
                                                <p>Date Of Booking: {formatDate(item.bm_date)}</p>
                                            </td>

                                            <td className="col-2">
                                                <p>Address Of Visit:</p> 
                                                <p> {item.bc_name}, {item.bc_house}, {item.bc_street}, {item.bc_dist}, {item.bc_pin}, {item.bc_phone}</p>
                                            </td>
                                            <td>
                                                <p>Time Of Visit: {item.bc_time}</p>
                                                <p>Date Of Visit: {formatDate(item.bc_date)}</p>
                                            </td>

                                            <td className="col-2">
                                                <p>Hours Worked: {item.bc_hours}</p>
                                                <p>Total Amount Paid: Rs. {item.tot_amt}</p>
                                                <p>Feedback: {item.feedback}</p>
                                            </td>

                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                data.length == 0 ?
                                    <p className="text-muted text-center p-5">Nothing Yet!</p>
                                :
                                    <p className="visually-hidden"></p>
                            }
                        </div>
                    </div>

        </Fragment>
    )
};

export default CustomerPrevBooking;