import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Fragment>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container-fluid my-2">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="http://localhost:3000">Urban Gardener</a>
                    <div class="collapse navbar-collapse mx-3" id="navbarTogglerDemo03">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">Balcony Gardener</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">Flower Gardener</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">Vegetable Gardener</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">About Us</a>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navbar;