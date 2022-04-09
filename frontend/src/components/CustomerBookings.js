import React, {Fragment, useState, useEffect} from "react";
import Sidebar from "./Sidebar";

import CustomerWorkPending from './CustomerWorkPending';
import CustomerPaymentPending from './CustomerPaymentPending';
import CustomerPrevBooking from './CustomerPrevBooking';
import CustomerCancelledBooking from './CustomerCancelledBooking';


const CustomerBookings = ({setAuth}) => {

    const [isActive,setActive] = useState("booking");

    function TabDisplay(){

        if (sessionStorage.getItem("tab")) {

            if(sessionStorage.getItem("tab") === 'payment pending'){
                
                return <CustomerPaymentPending />
            }

            else if(sessionStorage.getItem("tab") === 'prev work'){
                 
                return <CustomerPrevBooking />
            }

            else if(sessionStorage.getItem("tab") === 'cancelled'){
                 
                return <CustomerCancelledBooking />
            }

            else{
                
                return <CustomerWorkPending />
            }

        }

        else{

            return <CustomerWorkPending />
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

export default CustomerBookings;