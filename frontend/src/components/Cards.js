import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";

const Cards = () => {
    return (
        <Fragment>
            <h3 className="mt-5 text-center">Why Choose Us?</h3>
            <div className="row row-cols-1 row-cols-md-2 g-4 mx-5 my-3">
                <div className="col">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">Owner Friendly!</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">Done with Atmost Care!</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">Beautiful Landscaping.</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">GreenHouse Maintenance.</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Cards;