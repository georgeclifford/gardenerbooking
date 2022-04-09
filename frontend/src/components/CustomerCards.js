import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

// Bootstrap icon imports
import { ReactComponent as Stop} from "bootstrap-icons/icons/slash-circle-fill.svg";
import { ReactComponent as Activate} from "bootstrap-icons/icons/check-circle-fill.svg";

const CustomerCards = ({setAuth}) => {

    const [isActive,setActive] = useState("cards");

    const [inputs, setInputs] = useState({
        card_no: "",
        card_name: "",
        bank_name: "",
        card_type: "",
        exp_date: "",
        card_status: ""
      });

      const {cust_id,card_no,card_name,bank_name,card_type,exp_date,card_status} = inputs;

      const [data, setData] = useState([]);
    
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

            // console.log(parseRes);

            setInputs({...inputs, 
                cust_id: parseRes.cust_id,
            });
            
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

            setData(parseRes);

            // console.log(parseRes.token);


        } catch (err) {

            console.error(err.message);
            
        }
    }

    // New card addition function
    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {cust_id,card_no,card_name,bank_name,card_type,exp_date};
            
            const response = await fetch("http://localhost:5000/dashboard/newcard",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {
                sessionStorage.setItem('msg', 'add');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Card deactivation function
    async function onDeac(card_id){

        try {

            const body = {card_id};
            
            const response = await fetch("http://localhost:5000/dashboard/deactivatecard",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {
                sessionStorage.setItem('msg', 'deac');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
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

        if (sessionStorage.getItem("msg")) {

            if(sessionStorage.getItem("msg") === 'deac'){
                toast.success("Action Successful!",{
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
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-7 col-md-7 col-sm-7 mx-auto">
                    <h1 className="mb-3 text-center">Cards</h1>
                    
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-outline-dark mb-3" data-bs-toggle="modal" data-bs-target="#newcard">New Card</button>
                    </div>

                    <Table hover responsive className="styled-table">
                        <thead className="bg-dark text-white">
                            <tr>
                            <th>Sl. No.</th>
                            <th>Card Number</th>
                            <th>Name On Card</th>
                            <th>Bank Name</th>
                            <th>Card Type</th>
                            <th>Expiry Date</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => (
                                
                                <tr key={item.card_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.card_no}</td>
                                    <td>{item.card_name}</td>
                                    <td>{item.bank_name}</td>
                                    <td>{item.card_type}</td>
                                    <td>{formatDate(item.exp_date)}</td>
                                    {
                                        item.card_status === "active"?
                                        <td><button className="btn btn-sm btn-danger" onClick={() => onDeac(item.card_id)} title="Deactivate"><Stop className="mt-n1" /></button></td>
                                        :
                                        <td><button className="btn btn-sm btn-success" onClick={() => onDeac(item.card_id)} title="Activate"><Activate className="mt-n1" /></button></td>
                                    }
                                </tr>
                                ))
                        }
                        </tbody>
                    </Table>

                    {/* New Card Modal */}
                    <div className="modal fade" id="newcard" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">New Card</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                            </div>

                            <form onSubmit={onSubmitForm} className=" row g-3 needs-validation">
                                <div className="modal-body d-flex flex-column align-items-center">

                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Card Number</label>
                                        <div className="input-group has-validation">
                                            <input type="text" minLength="16" maxLength="16" className="form-control" name="card_no" onChange={e => onChange(e)} placeholder="1234 5678 9012 3456" required />
                                        </div>
                                    </div>

                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Name On Card</label>
                                        <div className="input-group has-validation">
                                            <input type="text" className="form-control" name="card_name" onChange={e => onChange(e)} placeholder="Name" required />
                                        </div>
                                    </div>

                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Bank Name</label>
                                        <div className="input-group has-validation">
                                            <input type="text" className="form-control" name="bank_name" onChange={e => onChange(e)} placeholder="Bank Name" required />
                                        </div>
                                    </div>

                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Card Type</label>
                                        <div className="input-group has-validation">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="card_type" id="inlineRadio1" onChange={e => onChange(e)} value="Credit Card"  />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Credit Card</label>
                                            </div>
                                                <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="card_type" id="inlineRadio2" onChange={e => onChange(e)} value="Debit Card"  />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Debit Card</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Expiry Date</label>
                                        <div className="input-group has-validation">
                                            <input type="month" className="form-control" name="exp_date" onChange={e => onChange(e)} placeholder="Bank Name" required />
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-dark">Add Card</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
};

export default CustomerCards;