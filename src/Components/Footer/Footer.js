/**
 *   Name: Footer.js
 * Author: Francisco J. O'Meany
 * Description: Footer class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from "react";
import { FormattedMessage } from 'react-intl';
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import './Footer.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.lang = props.lang;
    }

    getYear() {
        let today = new Date();
        return( today.getFullYear() );
    }
    render() {
        return(
            <div>
                <footer id="footer" className="app-footer">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="copyright text-start">
                                    <FormattedMessage
                                        id = "app.footer-copyright"
                                        defaultMessage="{copy} {year} {company}"
                                    values={{
                                        copy: <>&copy;</>,
                                        company: <strong><span className="me-2">{ this.props.business }</span></strong>,
                                        year: this.getYear()
                                    }}
                                />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="text-end">
                                    <a href="https://facebook.com/netequaltech" className="facebook" target="_blank" rel="noreferrer">
                                        <FaFacebook className="app-social-icons me-2" />
                                    </a>
                                    <a href="https://twitter.com" className="twitter" target="_blank" rel="noreferrer">
                                        <BsTwitterX className="app-social-icons me-2" />
                                    </a>
                                    <a href="https://instagram.com" className="instagram" target="_blank" rel="noreferrer">
                                        <FaInstagramSquare className="app-social-icons me-2" />
                                    </a>
                                </div>			
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 text-center"></div>
                            <div className="col-md-6 col-sm-12 text-end">
                                Powered by Vysel
                            </div>
                        </div>
                    </div>
	            </footer>
            </div>
        );
    }
}

export default Footer;