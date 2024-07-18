/**
 *   Name: Header.js
 * Author: Francisco J. O'Meany
 * Description: Header class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React, { Component } from 'react';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import Utility from '../Utility/Utility';
import '../Header/Header.css';

class Header extends Component {
    constructor( props ) {
        super(props);
		this.Utl		= new Utility();																		//- Load our Utility class
		this.mounted	= false;																				//- In React version 18, a change was made to strict mode so 
		this.lng 		= this.Utl.getCookie("appLang");														//- that components will mount, then unmount, then mount again. 
		this.profile 	= JSON.parse(localStorage.getItem('profile'));                                          //- Get current profile information
		this.state		= { show: false, mainLogo: null };														//- Set component state
		this.theme		= this.profile.account.cus_bus_template;												//- Set component theme
    }

	componentDidMount() {
		this.setState({ show: false });
		const self		= this;

		document.addEventListener('readystatechange', function() {
			if (document.readyState === 'complete') {
				if( !self.mounted ) {
					self.Utl.appLogger('React app DOM fully loaded on Header component. Lang is: ', self.lng);
					self.addClasses = "app-theme-img app-header pb-3 " + 
						( self.profile.account.cus_bus_template === "0" ? "text-dark" : "text-white" );
					let mainLogo = 	"./accounts/" + self.profile.account.cus_account + 
									"/" + self.profile.account.cus_logo;
					self.setState({ mainLogo: mainLogo });														//- We have to setState for the image string to work on the <img src= parameter
					document.getElementsByTagName('title')[0].innerHTML = self.profile.account.cus_bus_name + 
								" - " + ( self.lng === 'en' ? 'Home' : 'Página Princpal' );						//- Set page title with business information
					switch( self.theme ) {
						case "0":																				//- Default header with customer logo/image
							let timerId = setInterval(function() {												//- Set timer to
								const appMainHdr = document.getElementById("appHeader");
								if( appMainHdr ) {
									appMainHdr.className += " app-theme-no-img";
									appMainHdr.classList.remove("app-bus-info");
									appMainHdr.classList.remove("app-theme-img");
									document.getElementById("appMainImageDiv0").style.marginTop = 0;
									document.getElementById("appViewMapBtn0").classList.remove("text-white");
									document.getElementById("appViewMapBtn0").classList.add("text-dark");
									window.scrollTo(0,0);
									clearInterval(timerId);														//- Clear timer
								}
							}, 250);
							break;
						case "1":																				//- Alternate image selected by customer
							const altImg = 
							( self.profile.account.cus_bus_alt_img !== null ? 
								self.profile.account.cus_bus_alt_img : "restaurant_6.jpg" );

							let timerImg = setInterval(function() {												//- Set timer to
								const appMainHdr = document.getElementById("appHeader");
								if( appMainHdr ) {
									appMainHdr.style.background = "linear-gradient(rgba(35, 35, 35, 0.5), rgba(35,35,35,.5)), url(./assets/images/samples/" + altImg + ")";
									appMainHdr.style.backgroundSize = "cover";
									appMainHdr.style.backgroundRepeat = "no-repeat";
									appMainHdr.style.backgroundPositionX = "center";
									appMainHdr.classList.remove("app-bus-info");
									window.scrollTo(0,0);
									clearInterval(timerImg);													//- Clear timer
								}
							}, 250);
							break;
						case "2":																				//- Carousel
							break;
						default:
							break;
					}
					self.mounted = true;
				}
			}
		});
	}

    render() {
        return(	<>{ this.profile && <BusinessInfo id="appHeader" addClass={this.addClasses} index={0} theme={this.profile.account.cus_bus_template} /> }</> );
    }
}

export default Header;