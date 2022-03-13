import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

//Bootstrap icon imports
import { ReactComponent as Stop} from "bootstrap-icons/icons/slash-circle-fill.svg";
import { ReactComponent as Activate} from "bootstrap-icons/icons/check-circle-fill.svg";

const Specializations = ({setAuth}) => {

    const [isActive,setActive] = useState("specializations");

    const [inputs, setInputs] = useState({
        cat_id: ""
      });

      const {cat_id} = inputs;

      const [spec, setSpec] = useState([]);
    
      const onChange = (e) => {
          setInputs({...inputs,[e.target.name] : e.target.value});
      }

    const [cat, setCat] = useState([]);

    // Function for fetching category details
    async function getCategoryDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/categorydisplay", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            setCat(parseRes);

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Function for fetching specialization details
    async function getSpecDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/specdetails", {
                method: "GET",
                headers: {token: localStorage.token, user_id: localStorage.user_id}
            });

            const parseRes = await response.json();

            setSpec(parseRes);

            // console.log(parseRes.token);


        } catch (err) {

            console.error(err.message);
            
        }
    }

    // New specialization addition function
    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {cat_id};
            
            const response = await fetch("http://localhost:5000/dashboard/newspec",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token, user_id: localStorage.user_id},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if(parseRes === true) {

                toast.success("Specialization Added Successfully!",{
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

    // Specialization deactivation function
    async function onDeac(sc_id){

        try {

            const body = {sc_id};
            
            const response = await fetch("http://localhost:5000/dashboard/deactivatespec",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

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

    useEffect(() => {
        getCategoryDetails();
        getSpecDetails();
    }, [0]);

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-7 col-md-7 col-sm-7 mx-auto">
                    <h1 className="mb-3 text-center">Specializations</h1>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-outline-dark mb-3" data-bs-toggle="modal" data-bs-target="#newspec">Add Specialization</button>
                    </div>
                    <Table hover responsive className="styled-table">
                        <thead className="bg-dark text-white">
                            <tr>
                            <th>Sl. No.</th>
                            <th>Specialization ID</th>
                            <th>Specializations</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            spec.map((item, index) => ( 
                                
                                <tr key={item.sc_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.sc_id}</td>
                                    <td>{item.cat_name}</td>
                                    {
                                        item.sc_status === "active"?
                                        <td><button className="btn btn-sm btn-danger" onClick={() => onDeac(item.sc_id)} title="Deactivate"><Stop className="mt-n1" /></button></td>
                                        :
                                        <td><button className="btn btn-sm btn-success" onClick={() => onDeac(item.sc_id)} title="Activate"><Activate className="mt-n1" /></button></td>
                                    }
                                </tr>
                                ))
                        }
                        </tbody>
                    </Table>

                    {/* New Spec Modal */}
                    <div className="modal fade" id="newspec" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Add Specialization</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                </div>

                                <form onSubmit={onSubmitForm} className=" row g-3 needs-validation">
                                    <div className="modal-body d-flex flex-column align-items-center">

                                        <div className=" col-md-8 mb-3">
                                            <label  className="form-label">Choose Category</label>
                                            <select className="form-select" name="cat_id" onChange={e => onChange(e)} id="inputGroupSelect01" required>
                                                <option selected hidden disabled>Choose...</option>
                                                {
                                                    cat.map((item, index) => (

                                                        <option key={item.cat_id} value={item.cat_id}> {item.cat_name} </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-dark">Add Specialization</button>
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

export default Specializations;