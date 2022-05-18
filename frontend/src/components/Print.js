import React, { Fragment, useState, useEffect } from "react";
import { ReactComponent as PrintIcon } from "bootstrap-icons/icons/printer-fill.svg";

import {Link, useSearchParams} from "react-router-dom";

const Print = ({setAuth}) =>{
    const [params, setTParams] = useSearchParams();

    const [data, setData] = useState([]);

    const type = params.get('type');

    const serverBaseURI = 'http://localhost:5000'

    //console.log(type);

    // Date format function
    function formatDate(stringDate){
        var date=new Date(stringDate);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
    }

    function myPrint(){
        window.print();
    }

    async function getData(){
        if(type == 'allocpending'){
            try {
                const response = await fetch(`http://localhost:5000/dashboard/adminallocpending`,{
                method:"GET",
                headers: { token: localStorage.token }
            });
      
            const parseRes = await response.json();
            console.log(parseRes);
            setData(parseRes);  
            } catch (err) {
                console.log(err.message);
            } 
        }
        else if(type == 'workpending'){
            try {
                const isActiveMenu = 'full';
                const response = await fetch(`http://localhost:5000/dashboard/adminworkpending`,{
                method:"GET",
                headers: { token: localStorage.token }
            });
      
            const parseRes = await response.json();
            console.log(parseRes);
            setData(parseRes);  
            } catch (err) {
                console.log(err.message);
            } 
        }else if(type == 'paymentpending'){
            try {
                //const isActiveMenu = 'full';
                const response = await fetch(`http://localhost:5000/dashboard/adminpaymentpending`,{
                method:"GET",
                headers: { token: localStorage.token }
            });
      
            const parseRes = await response.json();
            console.log(parseRes);
            setData(parseRes);  
            } catch (err) {
                console.log(err.message);
            } 
        }else if(type == 'prevbooking'){
            try {
                const isActiveMenu = 'full';
                const response = await fetch(`http://localhost:5000/dashboard/admincompletedwork`,{
                method:"GET",
                headers: { token: localStorage.token }
            });
      
            const parseRes = await response.json();
            console.log(parseRes);
            setData(parseRes);  
            } catch (err) {
                console.log(err.message);
            } 
        }else if(type == 'cancelledbooking'){
        try {
            const isActiveMenu = 'full';
            const response = await fetch(`http://localhost:5000/dashboard/admincancelled`,{
            method:"GET",
            headers: { token: localStorage.token }
        });
  
        const parseRes = await response.json();
        console.log(parseRes);
        setData(parseRes);  
        } catch (err) {
            console.log(err.message);
        } 
    }
    }

    // function to set cancel button
    function CancelMsg(props) {

        if (props.status == 'paid') {

                return (
                
                    <td className="col-2">
                        <p>Booking Cancelled!</p>
                        <p className="text-danger">Payment Was Not Refunded!</p>
                        <p>Reason: {props.reason}</p>
                    </td>
                );
        }

       else if(props.status == 'refunded'){

            return (
            
                <td className="col-2">
                    <p>Booking Cancelled!</p>
                    <p className="text-success">Payment Refunded!</p>
                    <p>Reason: {props.reason}</p>
                </td>
            );

       }
    }

    useEffect(() => {
        getData();
    }, [0]);
    
    return(
        
        <Fragment>  
            <div className="d-flex justify-content-center">
                
                <div className="pad1 col-lg-10 col-md-10 col-sm-10 mx-auto">

                    {
                        type === 'allocpending' ?
                        (
                            <>
                                <h1 className="mb-5 text-center">Allocation Pending</h1>
                                <div className="d-flex justify-content-end">
                                    <button class="btn btn-outline-dark d-print-none" title="Click To Print" onClick={myPrint}><PrintIcon className="mt-n1" /></button>
                                </div>
                                
                                <div className="my-3">
                                    <table>

                                        <tbody>
                                        {
                            
                                            data.map((item, index) => (
                                                
                                                <tr key={item.bmaster_id} className="list-group-item">

                                                    <td scope="row" className="col-2">
                                                        <p>Booking ID: {item.bmaster_id}</p>
                                                        <p>{item.c_fname} {item.c_lname}</p>
                                                        <p>{item.c_phno}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <img className="img mt-3" src={`${serverBaseURI}/images/${item.cat_image}`}/>
                                                        <p className="mt-2">{item.cat_name}</p>
                                                    </td>

                                                    <td>
                                                        <p>Advance Paid: Rs. {item.tot_amt}</p>
                                                        <p>Date Of Booking: {formatDate(item.bm_date)}</p>
                                                    </td>

                                                    <td className="col-3">
                                                        <p>Address Of Visit:</p> 
                                                        <p> {item.bc_name}, {item.bc_house}, {item.bc_street}, {item.bc_dist}, {item.bc_pin}, {item.bc_phone}</p>
                                                    </td>
                                                    <td>
                                                        <p>Time Of Visit: {item.bc_time}</p>
                                                        <p>Date Of Visit: {formatDate(item.bc_date)}</p>
                                                    </td>

                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>

                        ): type === 'workpending' ?
                        (
                            <>
                                <h1 className="mb-5 text-center">Work Pending</h1>
                                <div className="d-flex justify-content-end">
                                    <button class="btn btn-outline-dark d-print-none" title="Click To Print" onClick={myPrint}><PrintIcon className="mt-n1" /></button>
                                </div>
                                
                                <div className="my-3">
                                    <table>

                                        <tbody>
                                            {
                                            data.map((item, index) => (
                                                
                                                <tr key={item.bmaster_id} className="list-group-item">

                                                    <td scope="row" className="col-2">
                                                        <p>Booking ID: {item.bmaster_id}</p>
                                                        <p>{item.c_fname}{item.c_lname}</p>
                                                        <p>{item.c_phno}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <img className="img mt-3" src={`${serverBaseURI}/images/${item.cat_image}`}/>
                                                        <p className="mt-2">{item.cat_name}</p>
                                                    </td>

                                                    <td>
                                                        <p>Advance Paid: Rs. {item.tot_amt}</p>
                                                        <p>Date Of Booking: {formatDate(item.bm_date)}</p>
                                                    </td>

                                                    <td className="col-3">
                                                        <p>Address Of Visit:</p> 
                                                        <p> {item.bc_name}, {item.bc_house}, {item.bc_street}, {item.bc_dist}, {item.bc_pin}, {item.bc_phone}</p>
                                                    </td>
                                                    <td>
                                                        <p>Time Of Visit: {item.bc_time}</p>
                                                        <p>Date Of Visit: {formatDate(item.bc_date)}</p>
                                                    </td>
                                                    <td className="text-center">
                                                        <p>Allocated Staff: {item.s_fname} {item.s_lname}</p>
                                                    </td>
                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            
                        ): type === 'paymentpending' ?
                        (
                            <>
                                <h1 className="mb-5 text-center">Payment Pending</h1>
                                <div className="d-flex justify-content-end">
                                    <button class="btn btn-outline-dark d-print-none" title="Click To Print" onClick={myPrint}><PrintIcon className="mt-n1" /></button>
                                </div>
                                
                                <div className="my-3">
                                    <table>

                                        <tbody>
                                            {
                                            data.map((item, index) => (
                                                
                                                <tr key={item.bmaster_id} className="list-group-item">

                                                    <td scope="row" className="col-2">
                                                        <p>Booking ID: {item.bmaster_id}</p>
                                                        <p>{item.c_fname}{item.c_lname}</p>
                                                        <p>{item.c_phno}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <img className="img mt-3" src={`${serverBaseURI}/images/${item.cat_image}`}/>
                                                        <p className="mt-2">{item.cat_name}</p>
                                                    </td>

                                                    <td>
                                                        <p>Advance Paid: Rs. {item.tot_amt}</p>
                                                        <p>Date Of Booking: {formatDate(item.bm_date)}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <p>Address Of Visit:</p> 
                                                        <p> {item.bc_name}, {item.bc_house}, {item.bc_street}, {item.bc_dist}, {item.bc_pin}, {item.bc_phone}</p>
                                                    </td>
                                                    <td>
                                                        <p>Time Of Visit: {item.bc_time}</p>
                                                        <p>Date Of Visit: {formatDate(item.bc_date)}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <p>Hours Worked: {item.bc_hours}</p>
                                                        <p>Amount To Be Paid: Rs. {item.tot_amt * (item.bc_hours - 1)}</p>
                                                    </td>

                                                    <td>
                                                        <p>Allocated Staff: {item.s_fname} {item.s_lname}</p>
                                                    </td>

                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>

                        )
                        : type === 'prevbooking' ?
                        (
                            <>
                                <h1 className="mb-5 text-center">Completed & Paid Works</h1>
                                <div className="d-flex justify-content-end">
                                    <button class="btn btn-outline-dark d-print-none" title="Click To Print" onClick={myPrint}><PrintIcon className="mt-n1" /></button>
                                </div>
                                
                                <div className="my-3">
                                    <table>

                                    <tbody>
                                            {
                                            data.map((item, index) => (
                                                
                                                <tr key={item.bmaster_id} className="list-group-item">

                                                    <td scope="row" className="col-2">
                                                        <p>Booking ID: {item.bmaster_id}</p>
                                                        <p>{item.c_fname}{item.c_lname}</p>
                                                        <p>{item.c_phno}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <img className="img mt-3" src={`${serverBaseURI}/images/${item.cat_image}`}/>
                                                        <p className="mt-2">{item.cat_name}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <p>Advance Paid: Rs. {item.tot_amt / item.bc_hours}</p>
                                                        <p>Date Of Booking: {formatDate(item.bm_date)}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <p>Address Of Visit:</p> 
                                                        <p> {item.bc_name}, {item.bc_house}, {item.bc_street}, {item.bc_dist}, {item.bc_pin}, {item.bc_phone}</p>
                                                    </td>
                                                    <td className="col-2">
                                                        <p>Time Of Visit: {item.bc_time}</p>
                                                        <p>Date Of Visit: {formatDate(item.bc_date)}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <p>Hours Worked: {item.bc_hours}</p>
                                                        <p>Total Amount Paid: Rs. {item.tot_amt}</p>
                                                        <p>Feedback: {item.feedback}</p>
                                                    </td>

                                                    <td>
                                                        <p>Allocated Staff: {item.s_fname} {item.s_lname}</p>
                                                    </td>

                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>

                        ): type === 'cancelledbooking' ?
                        (
                            <>
                                <h1 className="mb-5 text-center">Cancelled Bookings</h1>
                                <div className="d-flex justify-content-end">
                                    <button class="btn btn-outline-dark d-print-none" title="Click To Print" onClick={myPrint}><PrintIcon className="mt-n1" /></button>
                                </div>
                                
                                <div className="my-3">
                                    <table>

                                        <tbody>
                                            {
                                            data.map((item, index) => (
                                                
                                                <tr key={item.bmaster_id} className="list-group-item">

                                                    <td scope="row" className="col-2">
                                                        <p>Booking ID: {item.bmaster_id}</p>
                                                        <p>{item.c_fname}{item.c_lname}</p>
                                                        <p>{item.c_phno}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <img className="img mt-3" src={`${serverBaseURI}/images/${item.cat_image}`}/>
                                                        <p className="mt-2">{item.cat_name}</p>
                                                    </td>

                                                    <td>
                                                        <p>Advance Paid: Rs. {item.tot_amt}</p>
                                                        <p>Date Of Booking: {formatDate(item.bm_date)}</p>
                                                    </td>

                                                    <td className="col-2">
                                                        <p>Address Of Visit:</p> 
                                                        <p> {item.bc_name}, {item.bc_house}, {item.bc_street}, {item.bc_dist}, {item.bc_pin}, {item.bc_phone}</p>
                                                    </td>

                                                    <td>
                                                        <p>Time Of Visit: {item.bc_time}</p>
                                                        <p>Date Of Visit: {formatDate(item.bc_date)}</p>
                                                    </td>

                                                    <CancelMsg status={item.pay_status} reason={item.bm_reason}/>
                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ):
                        (<></>)
                    }
                      
                </div>
                
            </div>
            
        </Fragment>
    );
    
}


export default Print;