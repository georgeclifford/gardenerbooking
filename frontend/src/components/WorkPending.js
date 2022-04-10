import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";

const WorkPending = () => {

    const [data, setData] = useState([]);
    
    const [staff, setStaff] = useState([]);

    const [todaydate, setDate] = useState([]);

    const serverBaseURI = 'http://localhost:5000'

    const [inputs, setInputs] = useState({
        bmaster_id: "",
        cat_id: "",
        stat: "",
        bm_reason: "",
        staff_id: ""
      });

      const {bmaster_id,stat,bm_reason,staff_id,cat_id} = inputs;

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

            const response = await fetch("http://localhost:5000/dashboard/adminworkpending", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            setData(parseRes);

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Booking cancellation function
    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {bmaster_id,stat,bm_reason};
            
            const response = await fetch("http://localhost:5000/dashboard/cancelbooking",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {
                sessionStorage.setItem('msg', 'cancel');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // staff allocation function
    const onSubmitStaff = async(e) => {

        e.preventDefault();

        try {

            const body = {bmaster_id,staff_id};
            
            const response = await fetch("http://localhost:5000/dashboard/editalloc",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(parseRes.token);

            if(parseRes === true) {
                sessionStorage.setItem('msg', 'alloc');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Function for Staff, allocation and specialization details
    async function onSend(bmaster_id, cat_id) {

        setInputs({...inputs, 
            bmaster_id: bmaster_id,
            cat_id: cat_id
        });

        try {

            const response = await fetch("http://localhost:5000/dashboard/staffspec", {
                method: "GET",
                headers: {token: localStorage.token, cat_id: cat_id}
            });

            const parseRes = await response.json();

            setStaff(parseRes);

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

            else if(sessionStorage.getItem("msg") === 'alloc'){
                toast.success("Allocation Successful!",{
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
                                    <a className="nav-link text-dark button" onClick={() => setTab("alloc pending")} aria-current="true" href="#">Allocation Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active button mx-2" onClick={() => setTab("work pending")} aria-current="true" href="#">Work Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button" onClick={() => setTab("payment pending")} href="#">Payment Pending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button mx-2" onClick={() => setTab("prev work")} href="#">Completed & Paid Works</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark button" onClick={() => setTab("cancelled")} href="#">Cancelled Bookings</a>
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
                                            <td className="text-center">
                                                <p>Allocated Staff: {item.s_fname} {item.s_lname}</p>
                                                <button className="btn btn-primary mx-1" onClick={() => onSend(item.bmaster_id, item.cat_id)} title="Allocate Staff" data-bs-toggle="modal" data-bs-target="#alloc">Reallocate</button>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Staff Allocation Modal */}
                    <div className="modal fade" id="alloc" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Reallocate Staff</h5>
                                    <button type="button" onClick={e => (document.getElementById("newcatform").reset())} className="btn-close" data-bs-dismiss="modal" ></button>
                                </div>

                                <form onSubmit={onSubmitStaff} className=" row g-3 needs-validation mx-3" encType="multipart/form-data">
                                    <div className="modal-body d-flex flex-column align-items-center">

                                        <div className=" col-md-8 mb-3">
                                                <label  className="form-label">Qualified Staff Members</label>
                                                <select className="form-select" name="staff_id" onChange={e => onChange(e)} id="inputGroupSelect01" required>
                                                    <option selected hidden disabled>Choose...</option>
                                                    {
                                                        staff.map((item, index) => (

                                                            <option key={item.staff_id} value={item.staff_id}>{item.s_fname} {item.s_lname}</option>
                                                        ))
                                                    }
                                                </select>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-dark">Allocate</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                    {/* Booking Cancellation Modal */}
                    <div className="modal fade" id="cancelbook" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Booking Cancellation</h5>
                                    <button type="button" onClick={e => (document.getElementById("newcatform").reset())} className="btn-close" data-bs-dismiss="modal" ></button>
                                </div>

                                <form onSubmit={onSubmitForm} className=" row g-3 needs-validation mx-3" encType="multipart/form-data">
                                    <div className="modal-body d-flex flex-column align-items-center">

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Reason For Cancellation</label>
                                            <textarea name="bm_reason" onChange={e => onChange(e)} className="form-control" placeholder="Enter Your Reason For Cancellation..." required />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-dark">Cancel Booking</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

        </Fragment>
    )
};

export default WorkPending;