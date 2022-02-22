import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const CustomerCards = ({setAuth}) => {

    // const [c_fname,setFName] = useState("");
    // const [c_lname,setLName] = useState("");

    const [isActive,setActive] = useState("cards");

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
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-7 col-md-7 col-sm-7 mx-auto">
                    <h1 className="mb-5 text-center">Cards</h1>
                    <p className="mt-5 text-center text-muted">No Cards Yet!</p>
                    {/* <form className="row px-5">

                    </form> */}
                </div>
            </div>
        </Fragment>
    )
};

export default CustomerCards;