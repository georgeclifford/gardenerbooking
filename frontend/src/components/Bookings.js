import React, {Fragment, useState, useEffect} from "react";
import Sidebar from "./Sidebar";

import AllocPending from './AllocPending';
import WorkPending from './WorkPending';
import PaymentPending from './PaymentPending';
import PrevBooking from './PrevBooking';
import CancelledBooking from './CancelledBooking';

const Bookings = ({setAuth}) => {

    const [isActive,setActive] = useState("bookings");

    function TabDisplay(){

        if (sessionStorage.getItem("tab")) {

            if(sessionStorage.getItem("tab") === 'payment pending'){
                
                return <PaymentPending />
            }

            else if(sessionStorage.getItem("tab") === 'prev work'){
                 
                return <PrevBooking />
            }

            else if(sessionStorage.getItem("tab") === 'cancelled'){
                 
                return <CancelledBooking />
            }

            else if(sessionStorage.getItem("tab") === 'work pending'){
                 
                return <WorkPending />
            }

            else{
                
                return <AllocPending />
            }

        }

        else{

            return <AllocPending />
        }

    }

    return (
        <Fragment>
            <div className="d-flex">
                <Sidebar setAuth={setAuth} isActive={isActive} />
                <div className="pad1 col-lg-8 col-md-8 col-sm-8 mx-auto">
                    <h1 className="mb-5 text-center">Bookings</h1>
                    
                    <TabDisplay />

                </div>
            </div>
        </Fragment>
    )
};

export default Bookings;