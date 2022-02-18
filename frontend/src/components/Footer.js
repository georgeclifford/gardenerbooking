import React, {Fragment, useState} from "react";
import { ReactComponent as Fbicon} from "bootstrap-icons/icons/facebook.svg";
import { ReactComponent as Twticon} from "bootstrap-icons/icons/twitter.svg";
import { ReactComponent as Igicon} from "bootstrap-icons/icons/instagram.svg";
import { ReactComponent as Yticon} from "bootstrap-icons/icons/youtube.svg";

const Footer = () => {
return (
    <Fragment>
        <footer class="page-footer font-small p-4 bg-dark text-light">

            <div class="container text-center">
                <div class="row">

                    <div class="col-md mt-3">
                        <h5 class="font-weight-bold">Urban Gardener</h5>
                        <p>An online gardener booking<br/>website since 2021.<br/>With over 1000+ Gardeners.</p>
                    </div>

                    <div class="col-md mt-3">
                        <h5 class="font-weight-bold">Contact Us</h5>
                        <ul class="list-unstyled">
                            <li>
                                <p>info@urbangardener.com</p>
                            </li>
                            <li>
                                <p>+ 91 987 654 3210</p>
                            </li>
                        </ul>
                    </div>

                    <div class="col-md mt-3">
                        <h5 class=" font-weight-bold">Address</h5>
                        <ul class="list-unstyled">
                            <li>
                                <p>Ernakulam, Kerala.</p>
                            </li>
                            <li>
                                <p>India.</p>
                            </li>
                        </ul>
                    </div>

                    <div class="col-md mt-3">
                        <h5 class="font-weight-bold">Social</h5>
                        <ul class="list-unstyled">
                            <li><a class="text-light text-decoration-none" href="#"> <Fbicon /> Facebook
                                </a></li>
                            <li><a class="text-light text-decoration-none" href="#"> <Twticon /> Twitter
                                </a></li>
                            <li><a class="text-light text-decoration-none" href="#"> <Igicon /> Instagram 
                                </a></li>
                            <li><a class="text-light text-decoration-none" href="#"> <Yticon /> Youtube
                                </a></li>
                        </ul>
                    </div>


                </div>

            </div>
            <hr />
            <div class="footer-copyright text-center py-1 " id="copyright">© 2022 Copyright</div>

        </footer>
    </Fragment>
);
}

export default Footer;