/**
 *   Name: Footer.js
 * Author: Francisco J. O'Meany
 * Description: Footer class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from "react";
import Utility from "../Utility/Utility";
import { FormattedMessage } from 'react-intl';
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import './Footer.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.Utl		= new Utility();																			//- Get an instance of our Utility class
        this.mounted	= false;																					//- In React version 18, a change was made to strict mode so 
        this.lang       = props.lang;                                                                               //- that components will mount, then unmount, then mount again. 
    }

    componentDidMount() {																							//- When component is mounted
		const self		= this;																						//- Set self as our class for future reference
		
		document.addEventListener('readystatechange', function() {													//- Add a 'readystatechange' event listener
			if (document.readyState === 'complete') {																//- When the readyState is completed
				if( !self.mounted ) {																				//- and this component has not been mounted
					self.Utl.appLogger('React app DOM fully loaded on Footer component. Language is: ', self.lang);	//- Log mounted event and show current language
                }
            }
        });
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
                                    <a href="https://facebook.com" className="me-3" target="_blank" rel="noreferrer">
                                        <FaFacebook className="app-social-icons" />
                                    </a>
                                    <a href="https://twitter.com" className="me-3" target="_blank" rel="noreferrer">
                                        <BsTwitterX className="app-social-icons" />
                                    </a>
                                    <a href="https://instagram.com" className="me-3" target="_blank" rel="noreferrer">
                                        <FaInstagramSquare className="app-social-icons" />
                                    </a>
                                    <a href="https://youtube.com" className="me-3" target="_blank" rel="noreferrer">
                                        <TfiYoutube className="app-social-icons" />
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