import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const Dashboard = ({setAuth}) => {

    // const [c_fname,setFName] = useState("");
    // const [c_lname,setLName] = useState("");

    const [isActive,setActive] = useState("dashboard");

    const [inputs, setInputs] = useState({
        c_fname: "",
        c_lname: "",
        c_phno: "",
        username: "",
        c_house: "",
        c_street: "",
        c_pin: "",
        c_dist: "",
        password: "",
        newpassword: "",
        confirmpassword: "",
      });

      const {user_id,c_fname,c_lname,username,c_phno,c_house,c_street,c_pin,c_dist,password,newpassword,confirmpassword} = inputs;
    
      const onChange = (e) => {
          setInputs({...inputs,[e.target.name] : e.target.value});
      }

    async function getName() {
        try {

            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            // console.log(parseRes);

            // setFName(parseRes.c_fname);
            // setLName(parseRes.c_lname);

            setInputs({...inputs, 
                user_id: parseRes.user_id,
                username: parseRes.username,
                c_fname: parseRes.c_fname,
                c_lname: parseRes.c_lname, 
                c_phno: parseRes.c_phno, 
                c_house: parseRes.c_house,
                c_street: parseRes.c_street, 
                c_pin: parseRes.c_pin, 
                c_dist: parseRes.c_dist, 
                password: parseRes.password
            })
            
        } catch (err) {

            console.error(err.message);
            
        }
    }

    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {user_id,c_fname,c_lname,c_phno,c_house,c_street,c_pin,c_dist};
            
            const response = await fetch("http://localhost:5000/dashboard/update",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes.token) {

                localStorage.setItem("token", parseRes.token);

                setAuth(true);

                toast.success("Successfully Updated!",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else {

                setAuth(false);
                toast.error(parseRes,{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }


        } catch (err) {

            console.error(err.message);
            
        }
    }

    useEffect(() => {
        getName();
    }, [0]);

    // $(".alert").delay(2000).slideUp(200, function () {
    //     $(this).alert('close');
    //   });

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-7 col-md-7 col-sm-7 m-auto">
                    <h1 className="mb-5 text-center">Profile</h1>
                    <form onSubmit={onSubmitForm} className="row px-5">

                        <div className="col-lg-6 mb-3">
                            <label  className="form-label">First Name</label>
                            <input type="text" name="c_fname" value={inputs.c_fname} onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                        </div>

                        <div className="col-lg-6 mb-3">
                            <label  className="form-label">Last Name</label>
                            <input type="text" name="c_lname" value={inputs.c_lname} onChange={e => onChange(e)} className="form-control" placeholder="First Name" required />
                        </div>

                        <div className="col-lg-12 mb-3">
                            <label  className="form-label">Email</label>
                            <input type="email" name="username" value={inputs.username} className="form-control" placeholder="example@email.com" disabled required />
                        </div>

                        <div className="col-lg-6 mb-3">
                            <label  className="form-label">Phone</label>
                            <input type="text" name="c_phno" value={inputs.c_phno} onChange={e => onChange(e)} minLength="10" maxLength="10"  className="form-control" placeholder="9876543210" required />
                        </div>

                        <div className="col-lg-6 mb-3">
                            <label  className="form-label">Pincode</label>
                            <input type="text" name="c_pin" value={inputs.c_pin} onChange={e => onChange(e)} minLength="6" maxLength="6" className="form-control" placeholder="Zip" required />
                        </div>

                        <div className="col-lg-4 mb-3">
                            <label  className="form-label">House</label>
                            <input type="text" name="c_house" value={inputs.c_house} onChange={e => onChange(e)} className="form-control" placeholder="House" required />
                        </div>

                        <div className="col-lg-4 mb-3">
                            <label  className="form-label">Street</label>
                            <input type="text" name="c_street" value={inputs.c_street} onChange={e => onChange(e)} className="form-control" placeholder="Street" required />
                        </div>

                        <div className="col-lg-4 mb-3">
                            <label  className="form-label">District</label>
                            <input type="text" name="c_dist" value={inputs.c_dist} onChange={e => onChange(e)} className="form-control" placeholder="District" required />
                        </div>

                        <div className="col-lg-12 col-md-6 col-sm-6 mx-1 mt-3">
                            <button className="btn btn-dark col-lg-3 col-md-12 col-sm-12"> Update Profile </button>
                        </div>

                    </form>

                    <div className=" col-lg-11 col-md-6 col-sm-6 mx-5">
                            <button className="btn btn-dark mx-1 mt-4 col-lg-3 col-md-10 col-sm-10" data-bs-toggle="modal" data-bs-target="#changepass">Change Password</button>
                            <button className="btn btn-danger mx-1 mt-4 col-lg-3 col-md-10 col-sm-10" data-bs-toggle="modal" data-bs-target="#deactivate">Deactivate Account</button>
                    </div>

                    <div className="modal fade" id="changepass" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <form className=" row g-3 needs-validation">
                            <div className="modal-body d-flex flex-column align-items-center">

                                <div className="col-md-8 mb-3">
                                <label className="form-label">Old Password</label>
                                <div className="input-group has-validation">
                                    {/* <span className="input-group-text" ><i className="bi bi-shield-lock"></i></span> */}
                                    <input type="password" minLength="5" className="form-control" name="password" onChange={e => onChange(e)} placeholder="********" required />
                                </div>
                                </div>

                                <div className="col-md-8 mb-3">
                                <label className="form-label">New Password</label>
                                <div className="input-group has-validation">
                                    {/* <span className="input-group-text" ><i className="bi bi-shield-lock"></i></span> */}
                                    <input type="password" minLength="5" className="form-control" name="newpassword" onChange={e => onChange(e)} placeholder="********" required />
                                </div>
                                </div>

                                <div className="col-md-8 mb-3">
                                <label className="form-label">Confirm Password</label>
                                <div className="input-group has-validation">
                                    {/* <span className="input-group-text" ><i className="bi bi-shield-lock"></i></span> */}
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

                    <div className="modal fade" id="deactivate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Deactivate Account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <form className=" row g-3 needs-validation">
                            <div className="modal-body d-flex flex-column align-items-center">

                                <div className="col-md-8 mb-3">
                                <label className="form-label">Enter Password</label>
                                <div className="input-group has-validation">
                                    {/* <span className="input-group-text" ><i className="bi bi-shield-lock"></i></span> */}
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
            </div>

        </Fragment>
    )
};

export default Dashboard;