import React, {Fragment} from "react";

const AboutUs = () => {
    return (
        <Fragment>
            <div className="d-flex">
                <div className="pad1 col-lg-6 col-md-6 col-sm-6 mx-auto text-center">
                    <h1 className="mb-5 text-center">About Us</h1>

                    <h3>Finding a good local gardener can be a challenge.</h3>

                    <p className="my-5">
                        There’s a chance you’ll get lucky with a recommendation from friends or family - but for most of us, 
                        it means hours spent trawling the internet, looking through terrible websites, trying to find a reputable company. 
                        Some companies try to charge for a quote, costing you time & money, with no guarantee of a great service.
                    </p>

                    <h4>
                        That's why we set up Gardeners for you - so you could book trusted, local professionals hassle-free. 
                    </h4>

                    <p className="my-5">
                        Need a gardener? We’ll provide a fast, no-obligation quote for your job. 
                        Just fill out our online form and our dedicated trade team will send you a quote. All free-of-charge.

                        If you’d like to go ahead with the booking, we'll schedule the job for a time that suits you. Then we’ll send you an email to confirm the booking. No long back-and-forth, no costly quote and no stress. 
                    </p>
                    
                    <h3>We believe in empowering our Gardeners!</h3>
                    
                    <p className="my-5">
                        Ensuring dignified employment, a healthy income and a support network, 
                        we empower every member of our garden experts with the confidence of being able 
                        to pay back their debts and live a better life within the city.
                    </p>
                    <p>
                        The Urban Gardener fraternity of gardeners are also beneficiaries of microfinance options 
                        further allowing them to pay back agricultural debts, provide quality education for their children 
                        and better healthcare for their family members. 
                    </p>
                </div>
            </div>
        </Fragment>
    );
}

export default AboutUs;