import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        c_phno: "",
        c_fname: "",
        c_lname: "",
        c_house: "",
        c_street: "",
        c_dist: "",
        c_pin: "",
        confirmpass: ""
    });

    const {username, password, c_phno, c_fname, c_lname, c_house, c_street, c_dist, c_pin, confirmpass} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value });
    };

    // Register form submit function
    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {

            const body = {username, password, c_phno, c_fname, c_lname, c_house, c_street, c_dist, c_pin, confirmpass};

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST", 
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            //console.log(parseRes);

            if(parseRes.user_id){

                localStorage.setItem("user_id", parseRes.user_id)
            }

            if(parseRes.token) {

                localStorage.setItem("token", parseRes.token);
                setAuth(true);

                toast.success("Successfully Registered!",{
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
    };

    return (
        <Fragment>
            <div className="pad1 col-lg-7 col-md-8 col-sm-10 m-auto">
                <h1 className="mb-5 text-center">Register</h1>
                <form onSubmit={onSubmitForm} className="row px-5">

                    <div className="col-lg-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" name="c_fname" value={c_fname} onChange={e => onChange(e)} className="form-control" placeholder="Last Name" required />
                    </div>

                    <div className="col-lg-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="c_lname" value={c_lname} onChange={e => onChange(e)} className="form-control" placeholder="First Name" required />
                    </div>

                    <div className="col-lg-12 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="username" value={username} onChange={e => onChange(e)} className="form-control" placeholder="example@email.com" required />
                    </div>

                    <div className="col-lg-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" name="c_phno" value={c_phno} onChange={e => onChange(e)} minLength="10" maxLength="10"  className="form-control" placeholder="9876543210" required />
                    </div>

                    <div className="col-lg-6 mb-3">
                        <label className="form-label">Pincode</label>
                        <input type="text" name="c_pin" value={c_pin} onChange={e => onChange(e)} minLength="6" maxLength="6" className="form-control" placeholder="Zip" required />
                    </div>

                    <div className="col-lg-4 mb-3">
                        <label className="form-label">House</label>
                        <input type="text" name="c_house" value={c_house} onChange={e => onChange(e)} className="form-control" placeholder="House" required />
                    </div>

                    <div className="col-lg-4 mb-3">
                        <label className="form-label">Street</label>
                        <input type="text" name="c_street" value={c_street} onChange={e => onChange(e)} className="form-control" placeholder="Street" required />
                    </div>

                    <div className="col-lg-4 mb-3">
                        <label className="form-label">District</label>
                        <input type="text" name="c_dist" value={c_dist} onChange={e => onChange(e)} className="form-control" placeholder="District" required />
                    </div>

                    <div className="col-lg-6 mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" minLength="5" value={password} onChange={e => onChange(e)} className="form-control" placeholder="********" required />
                    </div>

                    <div className="col-lg-6 mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" name="confirmpass" value={confirmpass} onChange={e => onChange(e)} minLength="5" className="form-control" placeholder="********" required />
                    </div>

                    <div className="col-lg-12 d-grid gap-4">
                        <button className="btn btn-dark d-block mt-4">Sign Up</button>
                        <p className="text-center">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </Fragment>
    )
};

export default Register;