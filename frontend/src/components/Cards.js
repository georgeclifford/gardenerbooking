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
                    <h5 className="card-title">Organic Gardening!</h5>
                    <p className="card-text">Organic gardening uses natural, sustainable methods, fertilizers and pesticides to grow non-genetically modified crops.</p>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">Vegetable Gardening</h5>
                    <p className="card-text">There’s absolutely nothing quite like fresh veggies coming right from your garden. The juicy, fresh, flavorful veggies which you can pluck and put right on to your plate.</p>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">Beautiful Landscaping.</h5>
                    <p className="card-text">Landscaping varies according to different regions.[2] Therefore, normally local natural experts are recommended if it is done for the first time.</p>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">GreenHouse Maintenance.</h5>
                    <p className="card-text">The warmer temperature in a greenhouse occurs because incident solar radiation passes through the transparent roof and walls and is absorbed by the floor, earth, and contents, which become warmer.</p>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Cards;