import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const {username, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {

            const body = {username, password};
            
            const response = await fetch("http://localhost:5000/auth/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            //console.log(parseRes);

            if(parseRes.user_id){
                console.log(parseRes.user_id);
                localStorage.setItem("user_id", parseRes.user_id)
            }

            if(parseRes.token) {

                localStorage.setItem("token", parseRes.token);

                setAuth(true);

                toast.success("Successfully Logged In!",{
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

    return (
        <Fragment>
            <form onSubmit={onSubmitForm} className="pad1 d-flex flex-column align-items-center">
                <h1 className="mb-5">Login</h1>
                <div className="col-lg-5 col-md-7 col-sm-8 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="username" value={username} onChange={e => onChange(e)} className="form-control" placeholder="example@email.com" required />
                </div>

                <div className="col-lg-5 col-md-7 col-sm-8 mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" minLength="5" value={password} onChange={e => onChange(e)} className="form-control " placeholder="********" required />
                </div>

                <div className="col-lg-5 col-md-7 col-sm-8 d-grid gap-4">
                    <button className="btn btn-dark d-block mt-4">Sign In</button>
                    <p className="text-center">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </form>
        </Fragment>
    )
};

export default Login;