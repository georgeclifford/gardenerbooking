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

            if(parseRes.token) {

                localStorage.setItem("token", parseRes.token);
                setAuth(true);

                toast.success("Successfully Registered!");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
            
        } catch (err) {

            console.error(err.message);
            
        }
    };

    return (
        <Fragment>
            <div className="pad1 col-lg-7 col-md-7 col-sm-7 m-auto">
                <h1 className="mb-5 text-center">Register</h1>
                <form onSubmit={onSubmitForm} className="row px-5">

                    <div class="col-lg-6 mb-3">
                        <label for="exampleInputEmail1" class="form-label">First Name</label>
                        <input type="text" name="c_fname" value={c_fname} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="Last Name" required />
                    </div>

                    <div class="col-lg-6 mb-3">
                        <label for="exampleInputEmail1" class="form-label">Last Name</label>
                        <input type="text" name="c_lname" value={c_lname} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="First Name" required />
                    </div>

                    <div class="col-lg-12 mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" name="username" value={username} onChange={e => onChange(e)} className="form-control" placeholder="example@email.com" required />
                    </div>

                    <div class="col-lg-6 mb-3">
                        <label for="exampleInputEmail1" class="form-label">Phone</label>
                        <input type="text" name="c_phno" value={c_phno} onChange={e => onChange(e)} minLength="10" maxLength="10"  class="form-control" id="exampleInputEmail1" placeholder="9876543210" required />
                    </div>

                    <div class="col-lg-6 mb-3">
                        <label for="exampleInputEmail1" class="form-label">Pincode</label>
                        <input type="text" name="c_pin" value={c_pin} onChange={e => onChange(e)} minLength="6" maxLength="6" class="form-control" id="exampleInputEmail1" placeholder="Zip" required />
                    </div>

                    <div class="col-lg-4 mb-3">
                        <label for="exampleInputEmail1" class="form-label">House</label>
                        <input type="text" name="c_house" value={c_house} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="House" required />
                    </div>

                    <div class="col-lg-4 mb-3">
                        <label for="exampleInputEmail1" class="form-label">Street</label>
                        <input type="text" name="c_street" value={c_street} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="Street" required />
                    </div>

                    <div class="col-lg-4 mb-3">
                        <label for="exampleInputEmail1" class="form-label">District</label>
                        <input type="text" name="c_dist" value={c_dist} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="District" required />
                    </div>

                    <div class="col-lg-6 mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" name="password" minLength="5" value={password} onChange={e => onChange(e)} className="form-control" placeholder="********" required />
                    </div>

                    <div class="col-lg-6 mb-3">
                        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                        <input type="password" name="confirmpass" value={confirmpass} onChange={e => onChange(e)} minLength="5" class="form-control" placeholder="********" required />
                    </div>

                    <div class="col-lg-12 d-grid gap-4">
                        <button class="btn btn-dark d-block mt-4">Sign Up</button>
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