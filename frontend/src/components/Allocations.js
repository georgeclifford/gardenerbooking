import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const Allocations = ({setAuth}) => {

    const [isActive,setActive] = useState("allocations");


    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-7 col-md-7 col-sm-7 mx-auto">
                    <h1 className="mb-5 text-center">Allocations</h1>
                    <p className="mt-5 text-center text-muted">No Allocations Yet!</p>
                    
                </div>
            </div>
        </Fragment>
    )
};

export default Allocations;