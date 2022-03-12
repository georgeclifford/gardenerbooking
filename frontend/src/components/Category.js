import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

import { ReactComponent as Stop} from "bootstrap-icons/icons/slash-circle-fill.svg";
import { ReactComponent as Edit} from "bootstrap-icons/icons/pencil-fill.svg";
import { ReactComponent as Activate} from "bootstrap-icons/icons/check-circle-fill.svg";

const Category = ({setAuth}) => {

    const [isActive,setActive] = useState("category");

    const [inputs, setInputs] = useState({
        cat_id: "",
        cat_name: "",
        cat_desc: "",
        cat_price: ""
      });

      const {cat_id,cat_name,cat_desc,cat_price} = inputs;
    
      const onChange = (e) => {
          setInputs({...inputs,[e.target.name] : e.target.value});
      }

    const [data, setData] = useState([]);

    async function getCategoryDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/categorydetails", {
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

    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {cat_name,cat_desc,cat_price};
            
            const response = await fetch("http://localhost:5000/dashboard/newcategory",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {

                toast.success("Category Added Successfully!",{
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

    const onEditForm = async(e) => {

        e.preventDefault();

        try {

            const body = {cat_id,cat_name,cat_desc,cat_price};
            
            const response = await fetch("http://localhost:5000/dashboard/editcategory",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {

                toast.success("Category Updated Successfully!",{
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

    async function onDeac(cat_id){

        try {

            const body = {cat_id};
            
            const response = await fetch("http://localhost:5000/dashboard/deactivatecategory",{
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

    function onSend (id, name, desc, price){

        setInputs({...inputs, 
            cat_id: id,
            cat_name: name,
            cat_desc: desc, 
            cat_price: price
        });

    }

    useEffect(() => {
        getCategoryDetails();
    }, [0]);

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-9 col-md-9 col-sm-9 mx-auto">
                    <h1 className="mb-3 text-center">Category Details</h1>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-outline-dark mb-3" data-bs-toggle="modal" data-bs-target="#newcat">New Category</button>
                    </div>
                    <Table hover responsive className="styled-table">
                        <thead className="bg-dark text-white">
                            <tr>
                            <th>Sl. No.</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Price/Hr.</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => (
                                
                                <tr key={item.cat_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.cat_name}</td>
                                    <td>{item.cat_desc}</td>
                                    <td>{item.cat_price}</td>
                                    {
                                        item.cat_status === "active"?
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={() => onSend(item.cat_id, item.cat_name, item.cat_desc, item.cat_price)} title="Edit" data-bs-toggle="modal" data-bs-target="#editcat"><Edit className="mt-n1" /></button>
                                            <button className="btn btn-sm btn-danger mx-1" onClick={() => onDeac(item.cat_id)} title="Deactivate"><Stop className="mt-n1" /></button>
                                        </td>
                                        :
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={() => onSend(item.cat_id, item.cat_name, item.cat_desc, item.cat_price)} title="Edit" data-bs-toggle="modal" data-bs-target="#editcat"><Edit className="mt-n1" /></button>
                                            <button className="btn btn-sm btn-success mx-1" onClick={() => onDeac(item.cat_id)} title="Activate"><Activate className="mt-n1" /></button>
                                        </td>
                                    }
                                </tr>
                                ))
                        }
                        </tbody>
                    </Table>

                    {/* New Category Modal */}
                    <div className="modal fade" id="newcat" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">New Category</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                </div>

                                <form onSubmit={onSubmitForm} className=" row g-3 needs-validation">
                                    <div className="modal-body d-flex flex-column align-items-center">

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Category Name</label>
                                            <input type="text" name="cat_name" onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Description</label>
                                            <textarea name="cat_desc" onChange={e => onChange(e)} className="form-control" placeholder="Category Description" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Price/Hr.</label>
                                            <input type="number" name="cat_price" onChange={e => onChange(e)} className="form-control" placeholder="Rs.100/-" required />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-dark">Add Category</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                    {/* Edit Category Modal */}
                    <div className="modal fade" id="editcat" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Edit Category</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                </div>

                                <form onSubmit={onEditForm} className=" row g-3 needs-validation">
                                    <div className="modal-body d-flex flex-column align-items-center">

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Category Name</label>
                                            <input type="text" name="cat_name" value={inputs.cat_name} onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Description</label>
                                            <textarea name="cat_desc" value={inputs.cat_desc} onChange={e => onChange(e)} className="form-control" placeholder="Category Description" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Price/Hr.</label>
                                            <input type="number" name="cat_price" value={inputs.cat_price} onChange={e => onChange(e)} className="form-control" placeholder="Rs.100/-" required />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-dark">Update Category</button>
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

export default Category;