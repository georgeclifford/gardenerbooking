import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";

const Cards = () => {
    return (
        <Fragment>
            <h3 class="mt-5 text-center">Features.</h3>
            <div class="row row-cols-1 row-cols-md-2 g-4 mx-5 my-3">
                <div class="col">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" class="card-img-top" alt="..." />
                    <div class="card-body">
                    <h5 class="card-title">Owner Friendly!</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="card-img-top" alt="..." />
                    <div class="card-body">
                    <h5 class="card-title">Done with Atmost Care!</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" class="card-img-top" alt="..." />
                    <div class="card-body">
                    <h5 class="card-title">Beautiful Landscaping.</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="card-img-top" alt="..." />
                    <div class="card-body">
                    <h5 class="card-title">GreenHouse Maintenance.</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Cards;