import React, {Fragment, useState, useEffect} from "react";
import Sidebar from "./Sidebar";

import StaffWorkPending from './StaffWorkPending';
import StaffPaymentPending from './StaffPaymentPending';
import StaffPrevBooking from './StaffPrevBooking';

const Allocations = ({setAuth}) => {

    const [isActive,setActive] = useState("allocations");

    function TabDisplay(){

        if (sessionStorage.getItem("tab")) {

            if(sessionStorage.getItem("tab") === 'payment pending'){
                
                return <StaffPaymentPending />
            }

            else if(sessionStorage.getItem("tab") === 'prev work'){
                 
                return <StaffPrevBooking />
            }

            else{
                
                return <StaffWorkPending />
            }

        }

        else{

            return <StaffWorkPending />
        }

    }


    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-8 col-md-8 col-sm-8 mx-auto">
                    <h1 className="mb-5 text-center">Allocations</h1>
                    <TabDisplay />
                    
                </div>
            </div>
        </Fragment>
    )
};

export default Allocations;