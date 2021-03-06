import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";

const StaffDashboard = () => {

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

    }, [0]);


    return (
        <Fragment>
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
        </Fragment>
    )
};

export default StaffDashboard;