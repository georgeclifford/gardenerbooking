import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const CustomerPaymentPending = ({setAuth}) => {

    const [isActive,setActive] = useState("booking");
    
    const [data, setData] = useState([]);

    const [cards, setCards] = useState([]);

    const serverBaseURI = 'http://localhost:5000'

    const [inputs, setInputs] = useState({
        card_id: "",
        feedback: "",
        bmaster_id: "",
        bc_hours: "",
        tot_amt: ""
      });

      const {card_id,bmaster_id,tot_amt,bc_hours,feedback} = inputs;

      const onChange = (e) => {
        setInputs({...inputs,[e.target.name] : e.target.value});
    }

    // function to set tab
    function setTab(tab){

        sessionStorage.setItem('tab', tab);
        window.location.reload(true);

    }

    // Function for fetching payment pending details
    async function getDetails() {
        try {

            const response = await fetch("http://localhost:5000/dashboard/paymentpending", {
                method: "GET",
                headers: {token: localStorage.token, user_id: localStorage.user_id}
            });

            const parseRes = await response.json();

            setData(parseRes);

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Function for fetching card details
    async function getCardDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/carddetails", {
                method: "GET",
                headers: {token: localStorage.token, user_id: localStorage.user_id}
            });

            const parseRes = await response.json();

            setCards(parseRes);

            // console.log(parseRes.token);


        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Final payment function
    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {card_id,bmaster_id,tot_amt,bc_hours,feedback};
            
            const response = await fetch("http://localhost:5000/dashboard/bookingpay",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {
                sessionStorage.setItem('msg', 'update');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // setting data for Booking Cancellation
    function onSend(bmaster_id, tot_amt, bc_hours){

        setInputs({...inputs, 
            bmaster_id: bmaster_id,
            tot_amt: tot_amt,
            bc_hours: bc_hours
        });
    }

    // Date format function
    function formatDate(stringDate){
        var date=new Date(stringDate);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
    }

    useEffect(() => {

        if (sessionStorage.getItem("msg")) {
            if(sessionStorage.getItem("msg") === 'cancel'){
                toast.success("Cancellation Successful!",{
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
                toast.success("Payment Successful!",{
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
        getCardDetails();

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
                                    <a className="nav-link active button mx-2" onClick={() => setTab("payment pending")} href="#">Work Completed / Payment Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button" onClick={() => setTab("prev work")} href="#">Previous Completed Works</a>
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

                                            <td>
                                                <p>Advance Paid: Rs. {item.tot_amt}</p>
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
                                                <p>Amount To Be Paid: Rs. {item.tot_amt * (item.bc_hours - 1)}</p>
                                            </td>

                                            <td>
                                                <button className="btn btn-primary" title="Make Payment" onClick={() => onSend(item.bmaster_id, item.tot_amt, item.bc_hours)} data-bs-toggle="modal" data-bs-target="#pay">Pay</button>
                                            </td>

                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Booking Modal */}
                <div className="modal fade" id="pay" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Make Final Payment</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                </div>

                                <form onSubmit={onSubmitForm} className=" row g-3 needs-validation mx-3">

                                    <div className="modal-body mx-4 d-flex flex-column">

                                        <div className="d-flex">

                                            <p>Advance Amount Paid: </p>
                                            <h5 className="mx-2 ">Rs. {inputs.tot_amt}</h5>

                                        </div>

                                        <div className="d-flex">

                                            <p>Hours Worked: </p>
                                            <h5 className="mx-2 ">{inputs.bc_hours}</h5>

                                        </div>
                                    
                                        <div className="d-flex my-4">

                                            <h5>Total Amount To Be Paid: </h5>
                                            <h4 className="mx-2 ">Rs. {inputs.tot_amt * (inputs.bc_hours - 1)}</h4>

                                        </div>

                                        <h6 className="mb-3">Choose A Card For Payment:</h6>

                                        {
                                                cards.map((item, index) => (

                                                <div className="form-check" key={item.card_id}>
                                                    <input className="form-check-input" value={item.card_id} type="radio" onChange={e => onChange(e)} name="card_id" id="flexRadioDefault1"/>
                                                    <label className=" d-flex form-check-label" htmlFor="flexRadioDefault1">
                                                        <b>{item.card_no}</b> <p className="mx-3">{item.card_type}</p>{item.bank_name}
                                                    </label>
                                                </div>
                                            
                                                ))
                                        }

                                    </div>

                                        <div className="col-md-8 mb-3 mx-4">
                                            <label  className="form-label">Give Us Your Feedback!</label>
                                            <textarea name="feedback" onChange={e => onChange(e)} className="form-control" placeholder="Enter Your Feedback..." required />
                                        </div>

                                    <div className="modal-footer">
                                        <button className="btn btn-dark">Make Payment</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
    
        </Fragment>
    )
};

export default CustomerPaymentPending;