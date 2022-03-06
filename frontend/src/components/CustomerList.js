import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';

const CustomerList = ({setAuth}) => {

    const [isActive,setActive] = useState("customerlist");

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
                    <h1 className="mb-5 text-center">Customer Details</h1>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                            <th>Sl. No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>House</th>
                            <th>Street</th>
                            <th>District</th>
                            <th>Pin Code</th>
                            <th>Date Of Registration</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Jerin</td>
                            <td>Bhai</td>
                            <td>bhai@email.com</td>
                            <td>1234567890</td>
                            <td>valo</td>
                            <td>jett</td>
                            <td>ekm</td>
                            <td>682028</td>
                            <td>2022-02-15</td>
                            <td className="text-center"><button className="btn btn-sm btn-outline-danger">Deactivate</button></td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>George</td>
                            <td>Clifford</td>
                            <td>grg@email.com</td>
                            <td>8089966348</td>
                            <td>Nambiaparambil</td>
                            <td>Sreekala Road</td>
                            <td>Ernakulam</td>
                            <td>682028</td>
                            <td>2022-02-17</td>
                            <td className="text-center"><button className="btn btn-sm btn-outline-danger">Deactivate</button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </Fragment>
    )
};

export default CustomerList;