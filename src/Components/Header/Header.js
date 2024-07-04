/**
 *   Name: Header.js
 * Author: Francisco J. O'Meany
 * Description: Header class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'react-bootstrap/Button';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import Utility from '../Utility/Utility';
import logo from '../../Assets/images/mainLogo.jpg'
import map from '../../Assets/images/map.png';
import '../Header/Header.css';

class Header extends Component {
    constructor( props ) {
        super(props);
		this.profile	= null;
		this.Utl		= new Utility();
		this.state		= { show: false };
		this.mounted	= false;				//- In React version 18, a change was made to strict mode so that components will mount, then unmount, then mount again. 
		this.lng 		= this.Utl.getCookie("appLang");
		this.theme		= 0;
    }

	componentDidUpdate() {
		//console.log('Rerender');
	}

	componentDidMount() {
		this.setState({ show: false });
		const self		= this;

		document.addEventListener('readystatechange', function() {
			if (document.readyState === 'complete') {
				if( !self.mounted ) {
					self.Utl.appLogger('React app DOM fully loaded on Header component. Language is: ', self.lng);

					self.profile = JSON.parse(localStorage.getItem('profile'));
					if (self.profile) {
						self.Utl.appLogger("LocalProfile: ", self.profile );
					}

					self.theme = self.profile.account.cus_bus_template;

					document.getElementsByTagName('title')[0].innerHTML = self.profile.account.cus_bus_name + " - " + ( self.lng === 'en' ? 'Home' : 'Página Princpal' );
					document.querySelectorAll('.acctBusName').forEach( (x) => { x.innerHTML = self.profile.account.cus_bus_name } );
					document.querySelectorAll('.acctFoodType').forEach( (x) => { x.innerHTML = ( self.lng === 'en' ? self.profile.account.cus_food_type_en : self.profile.account.cus_food_type_es ) } );
					document.getElementById('acctBusAddress').innerHTML = self.profile.account.cus_bus_address;
					document.getElementById('acctBusCityState').innerHTML = self.profile.account.cus_city_state_zip;
					document.getElementById('acctBusPhone').innerHTML = self.profile.account.cus_bus_phone;


					switch( self.theme ) {
						case "0":
							document.getElementById("appHeader").className += "app-theme-no-img";
							break;
						case "1":
							document.getElementById("appHeader").className += " app-theme-img";
							document.getElementById("appMainImageDiv").className += " d-none";
							document.getElementById("appHeaderLeft").className += " text-white position-relative";
							document.getElementById("appHeaderCenter").className += " text-white position-relative";
							document.getElementById("appHeaderRight").className += " text-white position-relative";
							break;
						case "2":		//- Carousel
							break;
						default:
							break;
					}
					
					let monHrs = ( self.profile.account.cus_bus_hours_mon === null ? [null,null] : self.profile.account.cus_bus_hours_mon.split(";") );
					let tueHrs = ( self.profile.account.cus_bus_hours_tue === null ? [null,null] : self.profile.account.cus_bus_hours_tue.split(";") );
					let wedHrs = ( self.profile.account.cus_bus_hours_wed === null ? [null,null] : self.profile.account.cus_bus_hours_wed.split(";") );
					let thuHrs = ( self.profile.account.cus_bus_hours_thu === null ? [null,null] : self.profile.account.cus_bus_hours_thu.split(";") );
					let friHrs = ( self.profile.account.cus_bus_hours_fri === null ? [null,null] : self.profile.account.cus_bus_hours_fri.split(";") );
					let satHrs = ( self.profile.account.cus_bus_hours_sat === null ? [null,null] : self.profile.account.cus_bus_hours_sat.split(";") );
					let sunHrs = ( self.profile.account.cus_bus_hours_sun === null ? [null,null] : self.profile.account.cus_bus_hours_sun.split(";") );

					document.getElementById('appBusMonday').innerHTML  		= ( monHrs[0] === null ? ( self.lng === 'en' ? "Closed" : "Cerrado" ) : monHrs[0] + " - " + monHrs[1] );
					document.getElementById('appBusTuesday').innerHTML 		= ( tueHrs[0] === null ? ( self.lng === 'en' ? "Closed" : "Cerrado" ) : tueHrs[0] + " - " + tueHrs[1] );
					document.getElementById('appBusWednesday').innerHTML 	= ( wedHrs[0] === null ? ( self.lng === 'en' ? "Closed" : "Cerrado" ) : wedHrs[0] + " - " + wedHrs[1] );
					document.getElementById('appBusThursday').innerHTML 	= ( thuHrs[0] === null ? ( self.lng === 'en' ? "Closed" : "Cerrado" ) : thuHrs[0] + " - " + thuHrs[1] );
					document.getElementById('appBusFriday').innerHTML 		= ( friHrs[0] === null ? ( self.lng === 'en' ? "Closed" : "Cerrado" ) : friHrs[0] + " - " + friHrs[1] );
					document.getElementById('appBusSaturday').innerHTML		= ( satHrs[0] === null ? ( self.lng === 'en' ? "Closed" : "Cerrado" ) : satHrs[0] + " - " + satHrs[1] );
					document.getElementById('appBusSunday').innerHTML		= ( sunHrs[0] === null ? ( self.lng === 'en' ? "Closed" : "Cerrado" ) : sunHrs[0] + " - " + sunHrs[1] );

					document.getElementById('appNavToMap').classList.add("d-none");		//- Remove "View map" link
					self.mounted = true;
				}
			}
		});
	}

	scrollToMap = () => {
		const scrollToItem 	= document.getElementById( "appMap" );
		scrollToItem.scrollIntoView( { behavior: "smooth",  inline:  'start', block: "start" } );
	}

    render() {
        return(			
			<>
            <div id='appHeader' className="row app-header pb-3">
				<div id="appHeaderLeft" className="col-lg-4 text-center mt-2">
					<h5><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStarHalfAlt className='text-warning' /></h5>
					<h5><BiSolidDish className='app-icon-15' /> <span className="acctFoodType"></span></h5>
					<h4 id="acctBusAddress">Address</h4>
					<h4 id="acctBusCityState">City, State</h4>
					<h4 id="acctBusPhone"><FaPhoneAlt className='me-2' /></h4>
					<p className="mt-4 mb-0">
						<FormattedMessage
							id = "app-header-payments"
							defaultMessage="Type of payments accepted"
                        />
					</p>
					<p>
						<FaCcVisa style={{fontSize: '2em'}} className="me-2" />
						<FaCcMastercard style={{fontSize: '2em'}} className="me-2" />
						<FaCcDiscover style={{fontSize: '2em'}} className="me-2" />
						<FaCcAmex style={{fontSize: '2em'}} className="me-2" />
						<FaCcApplePay style={{fontSize: '2em'}} className="me-2" />
						<FaMoneyBillAlt style={{fontSize: '2em'}} />
						<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="-107.84625 -77.625 934.6675 465.75"><g fill="currentColor"><path d="M70 43l-65.727-.605V86H113.2L0 231.1V268h70v42.5h42V268h71.4c.6-1.7.81-6.284-2.99-10.484-6.3-7-11.31-14.316-15.91-23.516-2.1-4.1-3.695-9.01-4.295-9.41-14.06-.645-94.949-.478-94.905-.99L178.6 77.61V43H112V0H70zm303.3-20.3c-1 .4-1.3 22.5-1.3 106.2 0 113.1-.1 111.2 4.9 120.9 4.5 8.7 15.5 16.5 27.8 19.7 6.8 1.8 26.8 2 34.5.4 9.9-2.1 11.8-5.1 7.9-12.8-2.5-4.8-5.8-15.3-6.6-21.1-1.1-6.9-2.5-8-10.9-7.8-4 .1-7.8-.2-8.5-.6-4.1-2.6-4.1-3.3-4.1-104.6 0-65.1-.3-97.8-1-99.1-1-1.8-2.3-1.9-21.3-1.8-11.1 0-20.8.3-21.4.6zm91.7.3c-1.3.8-1.5 13.6-1.5 105.2 0 98.7.1 104.7 1.9 111.6 3.4 13.6 11.1 21.9 25.7 28 5.6 2.3 8.1 2.7 19.4 3 15.1.4 22.8-.7 30.5-4.6 7.6-3.7 7.8-6.3 1.3-15.8-2.6-3.8-6.6-10.3-8.8-14.4l-4-7.5-7.3-.1c-9.1-.2-10-.6-11.7-4.9-1.3-2.9-1.5-17.8-1.5-100.5 0-65.1-.3-97.8-1-99.1-1-1.8-2.3-1.9-21.3-1.9-11.1 0-20.9.5-21.7 1z"/><path d="M247.5 85.5c-.5.2-4.4 1.1-8.5 2-25.7 5.9-48.4 25.6-58 50.6-5.3 13.8-7.2 24.5-7.3 40.4-.1 22.3 4.4 38.7 14.7 54.3 11.6 17.5 28.6 29.4 50.6 35.4 7.5 2 10.8 2.3 28 2.3 17 0 20.5-.3 27.6-2.2 17.6-4.9 32.6-13 44.7-24.5 7.7-7.2 7.6-9.2-.2-15.2-3.2-2.5-9-7.9-12.8-12.1-4.8-5.1-7.7-7.5-9.2-7.5-1.4 0-4.6 2-7.7 5-10.7 9.7-24.2 14.3-41.9 14.2-16.2-.1-28-4.3-35.5-12.9-3.8-4.3-8.6-14.1-9.6-19.6l-.6-3.7h62.3c34.3 0 63-.4 63.7-.9 3.3-2.1 4.1-16.6 1.7-32.4-5.7-37.8-28.3-63.2-63.8-71.7-6.3-1.5-11.5-2-22.7-1.9-8 0-14.9.2-15.5.4zm26.7 38.6c7.3 1.5 16.3 6.5 20.5 11.3 3.9 4.4 7.9 12.3 8.9 17.4l.7 3.2h-81.5l.7-3.2c3-13.5 14.6-24.8 29-28.4 6.4-1.6 15-1.7 21.7-.3zM611 86.4c-35.5 7.9-59.5 32.9-67 69.8-4.5 21.8-2 47.2 6.5 65.4 11.6 25.2 32.7 41.5 61.5 47.4 9.1 1.9 12.7 2.1 27 1.7 12.1-.4 18.6-1.1 24.2-2.6 17.1-4.5 32.1-12.7 43.6-23.7 8.8-8.5 8.8-8.9-.7-16.8-4.4-3.6-10.3-9.3-13.1-12.6-6.5-7.5-8.2-7.6-15.5-1-10.9 9.9-23.9 14.3-42 14.2-25.4-.1-40.2-11-45-33l-.7-2.595h126.7c4.3-3.1 2.7-35.905-2.5-51.105-1-3-3.7-9-5.9-13.2-11.7-22.4-30.4-36.3-56.4-41.8-8.3-1.8-32.8-1.8-40.7-.1zm31.2 37.7c6.8 1.5 13.8 5 18.8 9.5 4.2 3.9 11 16.2 11 20v2.4h-81.2l.7-2.8c5.2-21.4 27.2-34.1 50.7-29.1z"/></g></svg>
					</p>

				</div>
				<div id="appHeaderCenter" className="col-lg-4 text-center mt-2">
					<div id="appMainImageDiv">
						<img id="appMainImage" className="app-img-round mb-2" src={logo} alt="" />
						<div className='row'>
							<div className='col-lg-12'>
								<span><BiSolidDish className='me-2 app-icon-15' /></span>
								<span className="acctFoodType"></span>
							</div>
						</div>
					</div>
				</div>
				<div id="appHeaderRight" className="col-lg-4 text-center mt-2">
					<h3>
						<FormattedMessage
							id = "app-bus-hours"
							defaultMessage="Business hours"
                        />
					</h3>
					
					<div className="row mt-2">
						<div className="col text-end pb-0">
						<FormattedMessage
							id = "app-day-monday"
							defaultMessage="Monday"
                        />
						</div>
						<div id="appBusMonday" className="col text-start pb-0"></div>
					</div>

					<div className="row">
						<div className="col text-end pb-0">
							<FormattedMessage
								id = "app-day-tuesday"
								defaultMessage="Tuesday"
							/>
						</div>
						<div id="appBusTuesday" className="col text-start pb-0"></div>
					</div>
					
					<div className="row">
						<div className="col text-end pb-0">
							<FormattedMessage
								id = "app-day-wednesday"
								defaultMessage="Wednesday"
							/>
						</div>
						<div id="appBusWednesday" className="col text-start pb-0"></div>
					</div>

					<div className="row">
						<div className="col text-end pb-0">
							<FormattedMessage
								id = "app-day-thursday"
								defaultMessage="Thursday"
							/>
						</div>
						<div id="appBusThursday" className="col text-start pb-0"></div>
					</div>

					<div className="row">
						<div className="col text-end pb-0">
							<FormattedMessage
								id = "app-day-friday"
								defaultMessage="Friday"
							/>
						</div>
						<div id="appBusFriday" className="col text-start pb-0"></div>
					</div>

					<div className="row">
						<div className="col text-end pb-0">
							<FormattedMessage
								id = "app-day-saturday"
								defaultMessage="Saturday"
							/>
						</div>
						<div id="appBusSaturday" className="col text-start pb-0"></div>
					</div>

					<div className="row">
						<div className="col text-end pb-0">
							<FormattedMessage
								id = "app-day-sunday"
								defaultMessage="Sunday"
							/>
						</div>
						<div id="appBusSunday" className="col text-start pb-0"></div>
					</div>

					<div className="row text-center mt-3">
						<div className="col">
							<Button onClick={this.scrollToMap} variant="secondary" size="lg" >
							<img src={map} alt="" />
							<FormattedMessage
								id = "app-get-directions"
								defaultMessage="Get directions"
							/>
							</Button>
						</div>
					</div>
				</div>
			</div>
			</>
        );
    }
}

export default Header;