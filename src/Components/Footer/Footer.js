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
        this.profile 	= JSON.parse(localStorage.getItem('profile'));                                              //- Get current profile information
        this.mounted	= false;																					//- In React version 18, a change was made to strict mode so 
        this.lang       = props.lang;                                                                               //- that components will mount, then unmount, then mount again. 
        this.state      = {  fb: this.profile.account.cus_bus_facebook, 
                             tw: this.profile.account.cus_bus_twitter, 
                             in: this.profile.account.cus_bus_instagram,
                             yt: this.profile.account.cus_bus_youtube };
    }

    componentDidMount() {																							//- When component is mounted
		const self		= this;																						//- Set self as our class for future reference
		document.addEventListener('readystatechange', function() {													//- Add a 'readystatechange' event listener
			if (document.readyState === 'complete') {																//- When the readyState is completed
				if( !self.mounted ) {																				//- and this component has not been mounted
                    
                    self.profile = JSON.parse(localStorage.getItem('profile'));                                     //- Get current profile information
                    const fbAcct = ( self.profile.account.cus_bus_facebook !== null ?                               //- Set social media accounts
                        "https://facebook.com/" + self.profile.account.cus_bus_facebook : null  );
                    const twAcct = ( self.profile.account.cus_bus_twitter !== null ? 
                        "https://x.com/" + self.profile.account.cus_bus_twitter : null  );
                    const inAcct = ( self.profile.account.cus_bus_instagram !== null ? 
                        "https://instagram.com/" + self.profile.account.cus_bus_instagram : null  );
                    const ytAcct = ( self.profile.account.cus_bus_youtube !== null ? 
                        "https://youtube.com/" + self.profile.account.cus_bus_youtube : null  );
                    self.setState({ fb: fbAcct });                                                                  //- Set Facebook account
                    self.setState({ tw: twAcct });                                                                  //- Set Twitter account
                    self.setState({ in: inAcct });                                                                  //- Set Instagram account
                    self.setState({ yt: ytAcct });                                                                  //- Set YouTube account
					self.Utl.appLogger('React app DOM fully loaded on Footer component. Lang is: ', self.lang);	    //- Log mounted event and show current language
                    self.mounted = true;                                                                            //- This component has been mounted and completed
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
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="copyright text-start">
                                    <FormattedMessage
                                        id = "app.footer-copyright"
                                        defaultMessage="{copy} {year} {company} {dash}"
                                        values={{
                                            copy: <>&copy;</>,
                                            company: <strong><span>{ this.props.business }</span></strong>,
                                            year: this.getYear(),
                                            dash: <>&ndash;</>
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="text-end">
                                    {this.state.fb && 
                                    <a href={this.state.fb} className="me-3" target="_blank" rel="noreferrer">
                                        <FaFacebook className="app-social-icons" />
                                    </a>
                                    }
                                    {this.state.tw && 
                                    <a href={this.state.tw} className="me-3" target="_blank" rel="noreferrer">
                                        <BsTwitterX className="app-social-icons" />
                                    </a>
                                    }
                                    {this.state.in && 
                                    <a href={this.state.in} className="me-3" target="_blank" rel="noreferrer">
                                        <FaInstagramSquare className="app-social-icons" />
                                    </a>
                                    }
                                    {this.state.yt && 
                                    <a href={this.state.yt} className="me-3" target="_blank" rel="noreferrer">
                                        <TfiYoutube className="app-social-icons" />
                                    </a>
                                    }
                                </div>			
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 text-center"></div>
                            <div className="col-md-6 col-sm-12 text-end app-footer-developer">
                                <a href="https://netequaltech.com" className="text-decoration-none" target="_blank" rel="noreferrer">
                                    <FormattedMessage
                                        id = "app-powered-by"
                                        defaultMessage="Powered by Vysel {trade}"
                                        values={{
                                            trade: <>&trade;</>
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
	            </footer>
            </div>
        );
    }
}

export default Footer;