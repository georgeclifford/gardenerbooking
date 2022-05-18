import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
    return (
        <Fragment>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img
                        src="https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        className="fixed-height d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>We Care!</h5>
                        <p>We garden with atmost care.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img
                        src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        className="fixed-height d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>From Beginning To Forever!</h5>
                        <p>Start your gardening and maintain it forever.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img
                        src="https://images.unsplash.com/photo-1582012107971-5aae799a70f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        className="fixed-height d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>We Do It All</h5>
                        <p>We cater all your gardening needs from A to Z.</p>
                    </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </Fragment>
    );
}

export default Carousel;