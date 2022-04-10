import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";

import { ReactComponent as Arrow} from "bootstrap-icons/icons/arrow-right.svg";

const StaffWorkPending = () => {

    const [data, setData] = useState([]);
    
    const [todaydate, setDate] = useState([]);

    const serverBaseURI = 'http://localhost:5000'

    const [inputs, setInputs] = useState({
        bmaster_id: "",
        bc_hours: "1",
      });

      const {bmaster_id,bc_hours} = inputs;

      const onChange = (e) => {
        setInputs({...inputs,[e.target.name] : e.target.value});
    }

    // function to set tab
    function setTab(tab){

        sessionStorage.setItem('tab', tab);
        window.location.reload(true);

    }

     // Function for fetching pending work details
     async function getDetails() {
        try {

            const response = await fetch("http://localhost:5000/dashboard/staffworkpending", {
                method: "GET",
                headers: {token: localStorage.token, user_id: localStorage.user_id}
            });

            const parseRes = await response.json();

            setData(parseRes);

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // work updation function
    const onSubmitForm = async(e, bmaster_id) => {

        e.preventDefault();

        try {

            const body = {bmaster_id,bc_hours};

            const response = await fetch("http://localhost:5000/dashboard/workupdate",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {
                sessionStorage.setItem('msg', 'update');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // function to calculate tomorrow's date
    function Datetoday(){
        var today = new Date();
        var dd = today.getDate() + 1;
        var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
        var yyyy = today.getFullYear();

        setDate(dd + '/' + mm + '/' + yyyy);
    }


    // Date format function
    function formatDate(stringDate){
        var date=new Date(stringDate);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
    }

    useEffect(() => {

        if (sessionStorage.getItem("msg")) {
            
            if(sessionStorage.getItem("msg") === 'cancel'){
                toast.success("Cancellation Successful!",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg");                
            }

            else if(sessionStorage.getItem("msg") === 'update'){
                toast.success("Updatation Successful!",{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg");                
            }
            
            else{
                toast.error(sessionStorage.getItem("msg"),{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                sessionStorage.removeItem("msg");
                
            }

        }

        getDetails();
        Datetoday();

    }, [0]);

    return (
        <Fragment>
                    <div className="card border-secondary">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">

                                <li className="nav-item">
                                    <a className="nav-link active button mx-2" onClick={() => setTab("work pending")} aria-current="true" href="#">Work Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button" onClick={() => setTab("payment pending")} href="#">Payment Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button mx-2" onClick={() => setTab("prev work")} href="#">Completed & Paid Works</a>
                                </li>
                            </ul>
                        </div>

                        <div>
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

                                            <td className="col-2">
                                                <form onSubmit={(e) => onSubmitForm(e,item.bmaster_id)} className=" row g-3 needs-validation mx-3" >
                                                <label  className="form-label">Hours Worked: </label>
                                                    <div className="d-flex  mb-3">
                                                        <input type="number" name="bc_hours" min="1" value={bc_hours} onChange={e => onChange(e)} className="form-control" required />
                                                        <button className="btn btn-dark btn-sm" type="submit"><Arrow className="mt-n1" /></button>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

        </Fragment>
    )
};

export default StaffWorkPending;