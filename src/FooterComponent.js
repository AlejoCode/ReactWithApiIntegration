import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center mt-2">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/home">SignUp</Link></li>
                            <li><Link to="/login">Log In</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Javascript FullStack Developer</h5>
                        <address className="white">
                        ReactJs<br />
                        React Native<br />
                        <i className="fa fa-phone fa-lg"></i>  : +57 3045648027<br />
                        <i className="fa fa-envelope fa-lg"></i>  : 
                        <a href="mailto:daniel.salgado02@gmail.com">
                            daniel.salgado02@gmail.com
                        </a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/daniel-alejandro-salgado-sanchez-13a740b1/" target="_blank"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter ml-4" href="https://twitter.com/alejoCode1" target="_blank"><i className="fa fa-twitter" ></i></a>
                            <a className="btn btn-social-icon btn-github ml-4" href="https://github.com/AlejoCode" target="_blank"><i className="fa fa-github" ></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">             
                    <div className="col-auto">
                        <p>© Copyright 2021, Daniel Alejandro Salgado</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;