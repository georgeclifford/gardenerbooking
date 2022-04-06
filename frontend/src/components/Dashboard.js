import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

// Bootstrap icon imports
import { ReactComponent as Check} from "bootstrap-icons/icons/patch-check-fill.svg";
import { ReactComponent as Stop} from "bootstrap-icons/icons/slash-circle-fill.svg";
import { ReactComponent as Edit} from "bootstrap-icons/icons/pencil-fill.svg";
import { ReactComponent as Activate} from "bootstrap-icons/icons/check-circle-fill.svg";

const Dashboard = ({setAuth}) => {

    const [isActive,setActive] = useState("dashboard");

    const [inputs, setInputs] = useState({
        cat_id: "",
        staff_id: "",
        fname: "",
        lname: "",
        phno: "",
        username: "",
        house: "",
        street: "",
        pin: "",
        dist: "",
        password: "",
        newpassword: "",
        confirmpassword: "",
      });

      const {cat_id,user_id,user_type,fname,lname,username,phno,house,street,pin,dist,password,newpassword,confirmpassword} = inputs;

      const [data, setData] = useState([]);

      const [spec, setSpec] = useState([]);

      const [cat, setCat] = useState([]);
    
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

            if(parseRes.user_type === "customer"){

                setInputs({...inputs, 
                    user_id: parseRes.user_id,
                    user_type: parseRes.user_type,
                    username: parseRes.username,
                    fname: parseRes.c_fname,
                    lname: parseRes.c_lname, 
                    phno: parseRes.c_phno, 
                    house: parseRes.c_house,
                    street: parseRes.c_street, 
                    pin: parseRes.c_pin, 
                    dist: parseRes.c_dist, 
                    password: parseRes.password
                });
            }
      
            else if(parseRes.user_type === "staff"){
      
                setInputs({...inputs, 
                    user_id: parseRes.user_id,
                    user_type: parseRes.user_type,
                    username: parseRes.username,
                    fname: parseRes.s_fname,
                    lname: parseRes.s_lname, 
                    phno: parseRes.s_phno, 
                    house: parseRes.s_house,
                    street: parseRes.s_street, 
                    pin: parseRes.s_pin, 
                    dist: parseRes.s_dist, 
                    password: parseRes.password
                });
            }

            else if(parseRes.user_type === "admin"){
      
                setInputs({...inputs, 
                    user_id: parseRes.user_id,
                    user_type: parseRes.user_type,
                    username: parseRes.username, 
                    password: parseRes.password
                });
            }
            
        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Function for fetching staff details for admin panel
    async function getStaffDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/staffdetails", {
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

    // Function for fetching category details for admin panel
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

    // Staff Specialization fetch function for admin panel
    async function onSpec(user_id) {

        setInputs({...inputs, 
            staff_id: user_id
        });

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/specdetails", {
                method: "GET",
                headers: {token: localStorage.token, user_id}
            });

            const parseRes = await response.json();

            setSpec(parseRes);

            // console.log(parseRes.token);


        } catch (err) {

            console.error(err.message);
            
        }
    }

    // New Staff addition function for admin panel
    const onSubmitStaff = async(e) => {

        e.preventDefault();

        try {

            const body = {fname,lname,username,phno,house,street,pin,dist,password,confirmpassword};
            
            const response = await fetch("http://localhost:5000/dashboard/addstaff",{
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

    // New Specialization addition function for admin panel
    const onSubmitSpec = async(e) => {

        e.preventDefault();

        try {

            const body = {cat_id};

            const user_id = inputs.staff_id;
            
            const response = await fetch("http://localhost:5000/dashboard/newspec",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token, user_id},
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

    // Customer/Staff panel updation function
    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {user_id, user_type, fname,lname,phno,house,street,pin,dist};
            
            const response = await fetch("http://localhost:5000/dashboard/update",{
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

    // Staff edit function for admin panel
    const onStaffEdit = async(e) => {

        e.preventDefault();

        try {

            const body = {user_id,fname,lname,phno,house,street,pin,dist};
            
            const response = await fetch("http://localhost:5000/dashboard/staffedit",{
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

    // Change password function for Customer/Staff panel
    const onChangePassword = async(e) => {

        e.preventDefault();

        try {

            const body = {user_id,password,newpassword,confirmpassword};
            
            const response = await fetch("http://localhost:5000/dashboard/changepassword",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

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

    // Change staff password function for admin panel
    const onChangeStaffPassword = async(e) => {

        e.preventDefault();

        try {

            const body = {user_id,newpassword,confirmpassword};
            
            const response = await fetch("http://localhost:5000/dashboard/changestaffpassword",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

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

    // Customer/Staff account deactivate function
    const onDeactivate = async(e) => {

        e.preventDefault();

        try {

            const body = {user_id,password};
            
            const response = await fetch("http://localhost:5000/dashboard/deactivate",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

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

    // Staff deactivation function for admin panel
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
                sessionStorage.setItem('msg', 'deac');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Specialization deactivate function for admin panel
    async function onDeacSpec(sc_id){

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
                sessionStorage.setItem('msg', 'deac');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Setting staff details for admin viewing on click
    function onSend (user_id, fname, lname, username, phno, house, street, dist, pin){

        setInputs({...inputs, 
            user_id: user_id,
            username: username,
            fname: fname,
            lname: lname, 
            phno: phno, 
            house: house,
            street: street, 
            dist: dist,
            pin: pin
        });
    }

    // Function for date format
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
            else if(sessionStorage.getItem("msg") === 'update'){
                toast.success("Updated Successfully",{
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
        getStaffDetails();
        getCategoryDetails();
    }, [0]);

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive}/>

                {
                    user_type === "admin" ?

                    // Admin panel

                            <div className="pad1 col-lg-9 col-md-9 col-sm-9 mx-auto">
                            
                                <h1 className="mb-3 text-center">Staff Details</h1>

                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-sm btn-outline-dark mb-3" data-bs-toggle="modal" data-bs-target="#newstaff">New Staff</button>
                                </div>

                                <Table hover responsive className="styled-table">
                                    <thead className="bg-dark text-white">
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
                                        <th>Date Of Joining</th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data.map((item, index) => (
                                            
                                            <tr key={item.staff_id}>
                                                <th scope="row">{index+1}</th>
                                                <td>{item.s_fname}</td>
                                                <td>{item.s_lname}</td>
                                                <td>{item.username}</td>
                                                <td>{item.s_phno}</td>
                                                <td>{item.s_house}</td>
                                                <td>{item.s_street}</td>
                                                <td>{item.s_dist}</td>
                                                <td>{item.s_pin}</td>
                                                <td>{formatDate(item.s_date)}</td>
                                                {
                                                    item.l_status === "active"?
                                                    <td>
                                                        <button className="btn btn-sm btn-warning" onClick={() => onSpec(item.user_id)} title="Specializations" data-bs-toggle="modal" data-bs-target="#editspec"> <Check className="mt-n1" /> </button>
                                                        <button className="btn btn-sm btn-primary mx-1" onClick={() => onSend(item.user_id, item.s_fname, item.s_lname, item.username, item.s_phno, item.s_house, item.s_street, item.s_dist, item.s_pin)} title="Edit" data-bs-toggle="modal" data-bs-target="#editstaff"> <Edit className="mt-n1" /> </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => onDeac(item.user_id)} title="Deactivate"> <Stop className="mt-n1" /> </button>
                                                    </td>
                                                    :
                                                    <td>
                                                        <button className="btn btn-sm btn-warning" onClick={() => onSpec(item.user_id)} title="Specializations" data-bs-toggle="modal" data-bs-target="#editspec"> <Check className="mt-n1" /> </button>
                                                        <button className="btn btn-sm btn-primary mx-1" onClick={() => onSend(item.user_id, item.s_fname, item.s_lname, item.username, item.s_phno, item.s_house, item.s_street, item.s_dist, item.s_pin)} title="Edit" data-bs-toggle="modal" data-bs-target="#editstaff"> <Edit className="mt-n1" /> </button>
                                                        <button className="btn btn-sm btn-success" onClick={() => onDeac(item.user_id)} title="Activate"> <Activate className="mt-n1" /> </button>
                                                    </td>
                                                }
                                            </tr>
                                            ))
                                    }
                                    </tbody>
                                </Table>

                                {/* New Staff Modal */}
                                <div className="modal fade" id="newstaff" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered modal-lg">

                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">New Staff</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                            </div>

                                            <form onSubmit={onSubmitStaff} className=" row g-3 needs-validation">
                                                <div className="modal-body d-flex flex-column align-items-center">

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">First Name</label>
                                                        <input type="text" name="fname" onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Last Name</label>
                                                        <input type="text" name="lname" onChange={e => onChange(e)} className="form-control" placeholder="First Name" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Email</label>
                                                        <input type="email" name="username" onChange={e => onChange(e)} className="form-control" placeholder="example@email.com" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Phone</label>
                                                        <input type="text" name="phno" onChange={e => onChange(e)} minLength="10" maxLength="10"  className="form-control" placeholder="9876543210" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">House</label>
                                                        <input type="text" name="house" onChange={e => onChange(e)} className="form-control" placeholder="House" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Street</label>
                                                        <input type="text" name="street" onChange={e => onChange(e)} className="form-control" placeholder="Street" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">District</label>
                                                        <input type="text" name="dist" onChange={e => onChange(e)} className="form-control" placeholder="District" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Pincode</label>
                                                        <input type="text" name="pin" onChange={e => onChange(e)} minLength="6" maxLength="6" className="form-control" placeholder="Zip" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label className="form-label">Password</label>
                                                        <input type="password" minLength="5" className="form-control" name="password" onChange={e => onChange(e)} placeholder="********" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label className="form-label">Confirm Password</label>
                                                        <input type="password" minLength="5" className="form-control" name="confirmpassword" onChange={e => onChange(e)} placeholder="Repeat Password" required />
                                                    </div>

                                                </div>
                                                <div className="modal-footer">
                                                    <button className="btn btn-dark">Add Staff</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>

                                {/* Edit Staff Modal */}
                                <div className="modal fade" id="editstaff" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered modal-lg">

                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">New Staff</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                            </div>

                                            <form onSubmit={onStaffEdit} className=" row g-3 needs-validation mx-3">
                                                <div className="modal-body d-flex flex-column align-items-center">

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">First Name</label>
                                                        <input type="text" name="fname" value={inputs.fname} onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Last Name</label>
                                                        <input type="text" name="lname" value={inputs.lname} onChange={e => onChange(e)} className="form-control" placeholder="First Name" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Email</label>
                                                        <input type="email" name="username" value={inputs.username} onChange={e => onChange(e)} className="form-control" placeholder="example@email.com" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Phone</label>
                                                        <input type="text" name="phno" value={inputs.phno} onChange={e => onChange(e)} minLength="10" maxLength="10"  className="form-control" placeholder="9876543210" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">House</label>
                                                        <input type="text" name="house" value={inputs.house} onChange={e => onChange(e)} className="form-control" placeholder="House" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Street</label>
                                                        <input type="text" name="street" value={inputs.street} onChange={e => onChange(e)} className="form-control" placeholder="Street" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">District</label>
                                                        <input type="text" name="dist" value={inputs.dist} onChange={e => onChange(e)} className="form-control" placeholder="District" required />
                                                    </div>

                                                    <div className="col-md-8 mb-3">
                                                        <label  className="form-label">Pincode</label>
                                                        <input type="text" name="pin" value={inputs.pin} onChange={e => onChange(e)} minLength="6" maxLength="6" className="form-control" placeholder="Zip" required />
                                                    </div>

                                                </div>
                                                <div className="modal-footer">
                                                <a className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#changestaffpass">Change Password</a>
                                                    <button className="btn btn-dark">Update Staff</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>

                                {/* Change Password Modal */}
                                <div className="modal fade" id="changestaffpass" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered">
            
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                        </div>
            
                                        <form onSubmit={onChangeStaffPassword} className=" row g-3 needs-validation">
                                        <div className="modal-body d-flex flex-column align-items-center">
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">New Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="newpassword" onChange={e => onChange(e)} placeholder="********" required />
                                            </div>
                                            </div>
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">Confirm Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="confirmpassword" onChange={e => onChange(e)} placeholder="Repeat Password" required />
                                            </div>
                                            </div>
            
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-dark">Change Password</button>
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>

                                {/* Edit Spec Modal */}
                                <div className="modal fade" id="editspec" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered modal-lg">

                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Staff Specializations</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                            </div>

                                            <div className="mx-5 my-3">

                                                    <button className="btn btn-sm btn-outline-dark mb-3" data-bs-toggle="modal" data-bs-target="#newspec">Add Specialization</button>

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
                                                                    <td><button className="btn btn-sm btn-danger" onClick={() => onDeacSpec(item.sc_id)} title="Deactivate"><Stop className="mt-n1" /></button></td>
                                                                    :
                                                                    <td><button className="btn btn-sm btn-success" onClick={() => onDeacSpec(item.sc_id)} title="Activate"><Activate className="mt-n1" /></button></td>
                                                                }
                                                            </tr>
                                                            ))
                                                    }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                                {/* New Spec Modal */}
                                <div className="modal fade" id="newspec" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered modal-lg">

                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Add Specialization</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                            </div>

                                            <form onSubmit={onSubmitSpec} className="mx-3 row g-3 needs-validation">
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

                    : user_type === "customer" ?

                    // Customer panel

                            <div className="pad1 col-lg-7 col-md-7 col-sm-7 m-auto">
                        
                                <h1 className="mb-5 text-center">Profile</h1>
                                <form onSubmit={onSubmitForm} className="row px-5">
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">First Name</label>
                                        <input type="text" name="fname" value={inputs.fname} onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                                    </div>
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">Last Name</label>
                                        <input type="text" name="lname" value={inputs.lname} onChange={e => onChange(e)} className="form-control" placeholder="First Name" required />
                                    </div>
            
                                    <div className="col-lg-12 mb-3">
                                        <label  className="form-label">Email</label>
                                        <input type="email" name="username" value={inputs.username} className="form-control" placeholder="example@email.com" disabled required />
                                    </div>
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">Phone</label>
                                        <input type="text" name="phno" value={inputs.phno} onChange={e => onChange(e)} minLength="10" maxLength="10"  className="form-control" placeholder="9876543210" required />
                                    </div>
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">Pincode</label>
                                        <input type="text" name="pin" value={inputs.pin} onChange={e => onChange(e)} minLength="6" maxLength="6" className="form-control" placeholder="Zip" required />
                                    </div>
            
                                    <div className="col-lg-4 mb-3">
                                        <label  className="form-label">House</label>
                                        <input type="text" name="house" value={inputs.house} onChange={e => onChange(e)} className="form-control" placeholder="House" required />
                                    </div>
            
                                    <div className="col-lg-4 mb-3">
                                        <label  className="form-label">Street</label>
                                        <input type="text" name="street" value={inputs.street} onChange={e => onChange(e)} className="form-control" placeholder="Street" required />
                                    </div>
            
                                    <div className="col-lg-4 mb-3">
                                        <label  className="form-label">District</label>
                                        <input type="text" name="dist" value={inputs.dist} onChange={e => onChange(e)} className="form-control" placeholder="District" required />
                                    </div>
            
                                    <div className="col-lg-12 col-md-6 col-sm-6 ">
                                        <button className="btn btn-dark mx-1 mt-3 col-lg-3 col-md-12 col-sm-12"> Update Profile </button>
                                        <a className="btn btn-dark mx-1 mt-3 col-lg-3 col-md-12 col-sm-12" data-bs-toggle="modal" data-bs-target="#changepass">Change Password</a>
                                        <a className="btn btn-danger mx-1 mt-3 col-lg-3 col-md-12 col-sm-12" data-bs-toggle="modal" data-bs-target="#deactivate">Deactivate Account</a>
                                    </div>
            
                                </form>
            
                                {/* Change Password Modal */}
                                <div className="modal fade" id="changepass" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered">
            
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                        </div>
            
                                        <form onSubmit={onChangePassword} className=" row g-3 needs-validation">
                                        <div className="modal-body d-flex flex-column align-items-center">
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">Old Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="password" onChange={e => onChange(e)} placeholder="********" required />
                                            </div>
                                            </div>
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">New Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="newpassword" onChange={e => onChange(e)} placeholder="********" required />
                                            </div>
                                            </div>
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">Confirm Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="confirmpassword" onChange={e => onChange(e)} placeholder="Repeat Password" required />
                                            </div>
                                            </div>
            
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-dark">Change Password</button>
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>
            
                                {/* Deactivate Account Modal */}
                                <div className="modal fade" id="deactivate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered">
            
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Deactivate Account</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                        </div>
            
                                        <form onSubmit={onDeactivate} className=" row g-3 needs-validation">
                                        <div className="modal-body d-flex flex-column align-items-center">
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">Enter Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="password" onChange={e => onChange(e)} placeholder="********" required />
                                            </div>
                                            </div>
            
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-danger">Deactivate</button>
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>
            
                            </div>

                    : user_type === "staff" ?

                    // Staff panel

                        <div className="pad1 col-lg-7 col-md-7 col-sm-7 m-auto">
                                
                                <h1 className="mb-5 text-center">Profile</h1>
                                <form onSubmit={onSubmitForm} className="row px-5">
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">First Name</label>
                                        <input type="text" name="fname" value={inputs.fname} onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                                    </div>
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">Last Name</label>
                                        <input type="text" name="lname" value={inputs.lname} onChange={e => onChange(e)} className="form-control" placeholder="First Name" required />
                                    </div>
            
                                    <div className="col-lg-12 mb-3">
                                        <label  className="form-label">Email</label>
                                        <input type="email" name="username" value={inputs.username} className="form-control" placeholder="example@email.com" disabled required />
                                    </div>
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">Phone</label>
                                        <input type="text" name="phno" value={inputs.phno} onChange={e => onChange(e)} minLength="10" maxLength="10"  className="form-control" placeholder="9876543210" required />
                                    </div>
            
                                    <div className="col-lg-6 mb-3">
                                        <label  className="form-label">Pincode</label>
                                        <input type="text" name="pin" value={inputs.pin} onChange={e => onChange(e)} minLength="6" maxLength="6" className="form-control" placeholder="Zip" required />
                                    </div>
            
                                    <div className="col-lg-4 mb-3">
                                        <label  className="form-label">House</label>
                                        <input type="text" name="house" value={inputs.house} onChange={e => onChange(e)} className="form-control" placeholder="House" required />
                                    </div>
            
                                    <div className="col-lg-4 mb-3">
                                        <label  className="form-label">Street</label>
                                        <input type="text" name="street" value={inputs.street} onChange={e => onChange(e)} className="form-control" placeholder="Street" required />
                                    </div>
            
                                    <div className="col-lg-4 mb-3">
                                        <label  className="form-label">District</label>
                                        <input type="text" name="dist" value={inputs.dist} onChange={e => onChange(e)} className="form-control" placeholder="District" required />
                                    </div>
            
                                    <div className="col-lg-12 col-md-6 col-sm-6 ">
                                        <button className="btn btn-dark mx-1 mt-3 col-lg-3 col-md-12 col-sm-12"> Update Profile </button>
                                        <a className="btn btn-dark mx-1 mt-3 col-lg-3 col-md-12 col-sm-12" data-bs-toggle="modal" data-bs-target="#changepass">Change Password</a>
                                    </div>
            
                                </form>

                                {/* Change Password Modal */}
                                <div className="modal fade" id="changepass" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-centered">
            
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                        </div>
            
                                        <form onSubmit={onChangePassword} className=" row g-3 needs-validation">
                                        <div className="modal-body d-flex flex-column align-items-center">
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">Old Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="password" onChange={e => onChange(e)} placeholder="********" required />
                                            </div>
                                            </div>
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">New Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="newpassword" onChange={e => onChange(e)} placeholder="********" required />
                                            </div>
                                            </div>
            
                                            <div className="col-md-8 mb-3">
                                            <label className="form-label">Confirm Password</label>
                                            <div className="input-group has-validation">
                                                <input type="password" minLength="5" className="form-control" name="confirmpassword" onChange={e => onChange(e)} placeholder="Repeat Password" required />
                                            </div>
                                            </div>
            
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-dark">Change Password</button>
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                            
                        </div>

                        :
                        
                        <p className="m-auto text-muted"> </p>

                }

                
            </div>

        </Fragment>
    )
};

export default Dashboard;