import React, {Fragment, useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { ReactComponent as Book} from "bootstrap-icons/icons/calendar2-check.svg";
import { ReactComponent as Info} from "bootstrap-icons/icons/info-circle.svg";

const CategoryView = ({isLoggedin}) => {

    const [isActive,setActive] = useState("reports");

    const [user_type,setUser] = useState("");

    const [data, setData] = useState([]);

    const serverBaseURI = 'http://localhost:5000'

    const [cat,setCategory] = useSearchParams();

    const c_id = cat.get("cat_id");

    const [inputs, setInputs] = useState({
        cat_id: "",
        cat_name: "",
        cat_desc: "",
        cat_price: "",
        cat_status: "",
        cat_image: "",
        bc_time: "",
        bc_date: "",
        name: "",
        house: "",
        street: "",
        dist: "Ernakulam",
        pin: "",
        phno: "",
        card_id: ""
      });

      const { cat_id,cat_name,cat_desc,cat_price,cat_status,cat_image, bc_time, bc_date, name,house,street,dist,pin,phno,card_id} = inputs;

      const onChange = (e) => {
        setInputs({...inputs,[e.target.name] : e.target.value});
    }

        // Name fetch function
        async function getUser() {
            try {
    
                const response = await fetch("http://localhost:5000/dashboard/", {
                    method: "GET",
                    headers: {token: localStorage.token}
                });
    
                const parseRes = await response.json();
    
                setUser(parseRes.user_type);
                
            } catch (err) {
    
                console.error(err.message);
                
            }
        }

    // Selected Category fetch function
    async function getCategoryDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/selectedcategory", {
                method: "GET",
                headers: {token: localStorage.token, c_id}
            });

            const parseRes = await response.json();

            if(parseRes){

                setInputs({...inputs, 
                    cat_id: parseRes.cat_id,
                    cat_name: parseRes.cat_name,
                    cat_desc: parseRes.cat_desc,
                    cat_price: parseRes.cat_price,
                    cat_status: parseRes.cat_status,
                    cat_image: parseRes.cat_image
                });

                // if(c_id !== parseRes.cat_id){
                //     window.location.reload(false);
                // }

            }


        } catch (err) {

            console.error(err.message);
            
        }
    }

    // Function for fetching card details
    async function getCardDetails() {

        try {
            
            const response = await fetch("http://localhost:5000/dashboard/carddetails", {
                method: "GET",
                headers: {token: localStorage.token, user_id: localStorage.user_id}
            });

            const parseRes = await response.json();

            setData(parseRes);

        } catch (err) {

            console.error(err.message);
            
        }
    }

    // New Booking function
    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {

            const body = {cat_id,cat_price,bc_time,bc_date,name,house,street,dist,pin,phno,card_id};
            
            const response = await fetch("http://localhost:5000/dashboard/newbooking",{
                method: "POST",
                headers: {"Content-Type": "application/json", token: localStorage.token, user_id: localStorage.user_id},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if(parseRes === true) {
                sessionStorage.setItem('msg', 'book');
                window.location.reload(true);
            } else {
                sessionStorage.setItem('msg', 'false');
            }

        } catch (err) {

            console.error(err.message);
            
        }
    }

    function BookNowButton() {

        if (isLoggedin) {
            if (user_type === "customer") {
            
                return <button className="btn btn-primary col-4" title="Make Booking" data-bs-toggle="modal" data-bs-target="#bookcat"><Book className="mt-n1 mx-1" /> Book Now</button>

            }
        }

        return <Link to="/login" className="btn btn-primary col-4"><Book className="mt-n1 mx-1" /> Book Now</Link>
    }

    // function to calculate tomorrow's date
    function Datetoday(){
        var today = new Date();
        var dd = today.getDate() + 1;
        var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }

    // function to calculate next month's date from today's date
    function DateNextMonth(){
        var today = new Date();
        var dd = today.getDate() + 1;
        var mm = today.getMonth() + 2; //January is 0 so need to add 1 to make it 1!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }

    console.log(c_id);
    console.log(inputs.cat_id);

      useEffect(() => {

        if (sessionStorage.getItem("msg")) {

            if(sessionStorage.getItem("msg") === 'book'){
                toast.success("Booking Successful",{
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

        getUser();
        getCategoryDetails();
        getCardDetails();
        
    }, [0]);

    return (
        <Fragment>
            <div>
                <div className="pad1 col-lg-7 col-md-12 col-sm-12 mx-auto">
                    <h1 className="text-center mb-5">Category Details</h1>

                    <div className="d-flex gap-5 col-8">
                        <img className="img mt-3" src={`${serverBaseURI}/images/${inputs.cat_image}`}/>
                        <div className="col-12 mt-3">
                            <h3 className="mb-4">{inputs.cat_name}</h3>
                            <h5 className="mb-3">{inputs.cat_desc}</h5>
                            <h4 className="mb-4">Rs. {inputs.cat_price} / Hour</h4>
                            <BookNowButton />
                        </div>
                    </div>
                    
                </div>

                {/* Booking Modal */}
                <div className="modal fade" id="bookcat" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Book Now</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                                </div>

                                <form onSubmit={onSubmitForm} className=" row g-3 needs-validation mx-3">
                                    <div className="modal-body d-flex flex-column align-items-center">

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Name</label>
                                            <input type="text" name="name" onChange={e => onChange(e)} className="form-control" placeholder="Name" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">House</label>
                                            <input type="text" name="house" onChange={e => onChange(e)} className="form-control" placeholder="House" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Street</label>
                                            <input type="text" name="street" onChange={e => onChange(e)} className="form-control" placeholder="Street" required />
                                        </div>

                                        <div className="col-md-8 ">
                                            <label  className="form-label">District</label>
                                            <input type="text" name="dist" onChange={e => onChange(e)} value={inputs.dist} className="form-control" placeholder="District" disabled required />
                                            <p className="text-danger"> <small><Info className="mt-n1 mx-1" />Our services are available only in Ernakulam!</small></p>
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Pincode</label>
                                            <input type="text" name="pin" onChange={e => onChange(e)} minLength="6" maxLength="6" className="form-control" placeholder="Zip" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Phone</label>
                                            <input type="text" name="phno" onChange={e => onChange(e)} minLength="10" maxLength="10"  className="form-control" placeholder="9876543210" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Time Of Visit</label>
                                            <input type="time" name="bc_time" min="08:00" max="16:00" onChange={e => onChange(e)} className="form-control" required />
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label  className="form-label">Date Of Visit</label>
                                            <input type="date" name="bc_date" min={Datetoday()} max={DateNextMonth()} onChange={e => onChange(e)} className="form-control" required />
                                        </div>

                                    </div>

                                    <hr/>

                                    <div className="modal-body mx-3 d-flex flex-column">
                                        
                                        <h4 className="mb-4">Pay Advance Amount</h4>

                                        <div className="d-flex">

                                            <p>Amount To Be Paid: </p><h5 className="mx-2 ">Rs. {inputs.cat_price}</h5>

                                        </div>

                                        {
                                            user_type === "customer"?
                                                data.map((item, index) => (

                                                <div className="form-check" key={item.card_id}>
                                                    <input className="form-check-input" value={item.card_id} type="radio" onChange={e => onChange(e)} name="card_id" id="flexRadioDefault1"/>
                                                    <label className=" d-flex form-check-label" htmlFor="flexRadioDefault1">
                                                        <b>{item.card_no}</b> <p className="mx-3">{item.card_type}</p>{item.bank_name}
                                                    </label>
                                                </div>
                                            
                                                ))
                                            :
                                            <p>Please Login!</p>
                                        }

                                    </div>

                                    <div className="modal-footer">
                                        <button className="btn btn-dark">Make Booking</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

            </div>
        </Fragment>
    )
};

export default CategoryView;