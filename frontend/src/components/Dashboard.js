import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const Dashboard = ({setAuth}) => {

    // const [c_fname,setFName] = useState("");
    // const [c_lname,setLName] = useState("");

    const [inputs, setInputs] = useState({
        fn: "",
        ln: "",
        ph: "",
        un: "",
        ps: "",
        hs: "",
        str: "",
        pin: "",
        dist: "",
      });

      const {fn,ln,un,ph,ps,hs,str,pin,dist} = inputs;
    
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

            setInputs({...inputs, fn: parseRes.c_fname,
                ln: parseRes.c_lname, ph: parseRes.c_phno, hs: parseRes.c_house,
                str: parseRes.c_street, pin: parseRes.c_pin, dist: parseRes.c_dist, un: parseRes.username})
            
        } catch (err) {

            console.error(err.message);
            
        }
    }

    useEffect(() => {
        getName();
    }, [0]);

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth}/>
                <div className="pad1 col-lg-7 col-md-7 col-sm-7 m-auto">
                    <h1 className="mb-5 text-center">Profile</h1>
                    <form className="row px-5">

                        <div class="col-lg-6 mb-3">
                            <label for="exampleInputEmail1" class="form-label">First Name</label>
                            <input type="text" name="fn" value={inputs.fn} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="Last Name" required />
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="exampleInputEmail1" class="form-label">Last Name</label>
                            <input type="text" name="ln" value={inputs.ln} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="First Name" required />
                        </div>

                        <div class="col-lg-12 mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="email" name="un" value={inputs.un} onChange={e => onChange(e)} className="form-control" placeholder="example@email.com" required />
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="exampleInputEmail1" class="form-label">Phone</label>
                            <input type="text" name="ph" value={inputs.ph} onChange={e => onChange(e)} minLength="10" maxLength="10"  class="form-control" id="exampleInputEmail1" placeholder="9876543210" required />
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="exampleInputEmail1" class="form-label">Pincode</label>
                            <input type="text" name="pin" value={inputs.pin} onChange={e => onChange(e)} minLength="6" maxLength="6" class="form-control" id="exampleInputEmail1" placeholder="Zip" required />
                        </div>

                        <div class="col-lg-4 mb-3">
                            <label for="exampleInputEmail1" class="form-label">House</label>
                            <input type="text" name="hs" value={inputs.hs} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="House" required />
                        </div>

                        <div class="col-lg-4 mb-3">
                            <label for="exampleInputEmail1" class="form-label">Street</label>
                            <input type="text" name="str" value={inputs.str} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="Street" required />
                        </div>

                        <div class="col-lg-4 mb-3">
                            <label for="exampleInputEmail1" class="form-label">District</label>
                            <input type="text" name="dist" value={inputs.dist} onChange={e => onChange(e)} class="form-control" id="exampleInputEmail1" placeholder="District" required />
                        </div>

                        {/* <div class="col-lg-6 mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" name="password" minLength="5" value={password} onChange={e => onChange(e)} className="form-control" placeholder="********" required />
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                            <input type="password" name="confirmpass" value={confirmpass} onChange={e => onChange(e)} minLength="5" class="form-control" placeholder="********" required />
                        </div> */}

                            <div class="col-lg-12 col-md-6 col-sm-6">
                            <button class="btn btn-dark mx-1 mt-3">Update Profile</button>
                            <button class="btn btn-dark mx-1 mt-3">Change Password</button>
                            <button class="btn btn-danger mx-1 mt-3">Deactivate Account</button>
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
};

export default Dashboard;