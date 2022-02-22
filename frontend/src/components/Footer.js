import React, {Fragment, useState} from "react";
import { ReactComponent as Fbicon} from "bootstrap-icons/icons/facebook.svg";
import { ReactComponent as Twticon} from "bootstrap-icons/icons/twitter.svg";
import { ReactComponent as Igicon} from "bootstrap-icons/icons/instagram.svg";
import { ReactComponent as Yticon} from "bootstrap-icons/icons/youtube.svg";

const Footer = () => {
return (
    <Fragment>
        <footer className="page-footer font-small p-4 bg-dark text-light">

            <div className="container text-center">
                <div className="row">

                    <div className="col-md mt-3">
                        <h5 className="font-weight-bold">Urban Gardener</h5>
                        <p>An online gardener booking<br/>website since 2021.<br/>With over 1000+ Gardeners.</p>
                    </div>

                    <div className="col-md mt-3">
                        <h5 className="font-weight-bold">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <p>info@urbangardener.com</p>
                            </li>
                            <li>
                                <p>+ 91 987 654 3210</p>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md mt-3">
                        <h5 className=" font-weight-bold">Address</h5>
                        <ul className="list-unstyled">
                            <li>
                                <p>Ernakulam, Kerala.</p>
                            </li>
                            <li>
                                <p>India.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md mt-3">
                        <h5 className="font-weight-bold">Social</h5>
                        <ul className="list-unstyled">
                            <li><a className="text-light text-decoration-none" href="#"> <Fbicon className="mx-1 mt-n1" /> Facebook
                                </a></li>
                            <li><a className="text-light text-decoration-none" href="#"> <Twticon className="mx-1 mt-n1" /> Twitter
                                </a></li>
                            <li><a className="text-light text-decoration-none" href="#"> <Igicon className="mx-1 mt-n1" /> Instagram 
                                </a></li>
                            <li><a className="text-light text-decoration-none" href="#"> <Yticon className="mx-1 mt-n1" /> Youtube
                                </a></li>
                        </ul>
                    </div>


                </div>

            </div>
            <hr />
            <div className="footer-copyright text-center py-1 ">© 2022 Copyright</div>

        </footer>
    </Fragment>
);
}

export default Footer;