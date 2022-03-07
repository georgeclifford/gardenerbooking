import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

const Category = ({setAuth}) => {

    const [isActive,setActive] = useState("category");

    const [inputs, setInputs] = useState({
        cat_name: "",
        cat_desc: "",
        cat_price: ""
      });

      const {cat_name,cat_desc,cat_price} = inputs;
    
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
                        <button className="btn btn-sm btn-outline-dark mb-3" data-bs-toggle="modal" data-bs-target="#newstaff">New Category</button>
                    </div>
                    <Table bordered hover responsive >
                        <thead>
                            <tr>
                            <th>Sl. No.</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Price/Hr.</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => ( // access directly from array
                                
                                <tr key={item.cat_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.cat_name}</td>
                                    <td>{item.cat_desc}</td>
                                    <td>{item.cat_price}</td>
                                    <td className="text-center d-flex">
                                        <button className="btn btn-sm btn-outline-success">Edit</button>
                                        <button className="btn btn-sm btn-outline-danger mx-1">Deactivate</button>
                                    </td>
                                </tr>
                                ))
                        }
                        </tbody>
                    </Table>

                    {/* New Category Modal */}
                    <div className="modal fade" id="newstaff" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
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
                </div>
            </div>
        </Fragment>
    )
};

export default Category;