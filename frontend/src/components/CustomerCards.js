import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

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
    
      const onChange = (e) => {
          setInputs({...inputs,[e.target.name] : e.target.value});
      }

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

    const getCardDetails = async(e) => {

        e.preventDefault();

        try {

            const body = {cust_id};
            
            const response = await fetch("http://localhost:5000/dashboard/carddetails",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            setInputs({...inputs, 
                cust_id: parseRes.cust_id,
                card_no: parseRes.card_no,
                card_name: parseRes.card_name,
                bank_name: parseRes.bank_name,
                card_type: parseRes.card_type,
                exp_date: parseRes.exp_date,
                card_status: parseRes.card_status
            });

        } catch (err) {

            console.error(err.message);
            
        }
    }

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

                toast.success("Card Added Successfully!",{
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

    useEffect(() => {
        getDetails();
        getCardDetails();
    }, [0]);

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-7 col-md-7 col-sm-7 mx-auto">
                    <h1 className="mb-3 text-center">Cards</h1>
                    {/* <p className="mt-5 text-center text-muted">No Cards Yet!</p> */}
                    
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-outline-dark mb-3" data-bs-toggle="modal" data-bs-target="#newcard">New Card</button>
                    </div>

                    <Table bordered hover responsive>
                        <thead>
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

                            <tr>
                            <td>1</td>
                            <td>{card_no}</td>
                            <td>{card_name}</td>
                            <td>{bank_name}</td>
                            <td>{card_type}</td>
                            <td>{exp_date}</td>
                            <td className="text-center"><button className="btn btn-sm btn-outline-danger">Deactivate</button></td>
                            </tr>

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