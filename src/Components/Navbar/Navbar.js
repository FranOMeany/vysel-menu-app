/**
 *   Name: Navbar.js
 * Author: Francisco J. O'Meany
 * Description: Navbar for Navbar class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { MDBSwitch } from 'mdb-react-ui-kit';
import { BiSolidDish } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { GiHamburger } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";
import Utility from '../Utility/Utility';


class AppNavbar extends React.Component {
    constructor( props ) {
        super(props);
		this.profile	= null;
		this.Utl		= new Utility();
		this.state		= { show: false };
        this.mounted	= false;				//- In React version 18, a change was made to strict mode so that components will mount, then unmount, then mount again. 
		this.lng 		= this.Utl.getCookie("appLang");
		this.theme		= "1";
    }

	componentDidMount() {
		this.setState({ show: false });
		const self		= this;

		document.addEventListener('readystatechange', function() {
			if (document.readyState === 'complete') {
				if( !self.mounted ) {
					self.Utl.appLogger('React app DOM is fully loaded on Header component. Language is: ', self.lng);

					self.profile = JSON.parse(localStorage.getItem('profile'));
					if (self.profile) {
						self.Utl.appLogger("LocalProfile: ", self.profile );
					}

					document.getElementsByTagName('title')[0].innerHTML = self.profile.account.cus_bus_name + " - " + ( self.lng === 'en' ? 'Home' : 'Página Princpal' );
                    document.querySelectorAll('.acctBusName').forEach( (x) => { x.innerHTML = self.profile.account.cus_bus_name } );

					self.mounted = true;
				}
			}
		});
	}


    scrollToMap = () => {
		const scrollToItem 	= document.getElementById( "appMap" );
		scrollToItem.scrollIntoView( { behavior: "smooth",  inline:  'start', block: "start" } );
	}

    handleClose = () => this.setState({ show: false });
  	handleShow  = () => this.setState({ show: true });

    handleLanguage( event ) {
        let Utl = new Utility();
        let lng = Utl.getCookie( "appLang" );
        let language = ( lng === 'en' ? 'es' : 'en' );
        Utl.setCookie( "appLang", language, 30 );
        document.location.reload()
        event.preventDefault();
    }

	handleOffCanvas = () => {
		const self = this;
		this.Utl.appLogger("onShow left canvas");
		document.getElementById('acctBusNameCanvas').innerHTML = this.profile.account.cus_bus_name;
		document.getElementById('acctFoodTypeCanvas').innerHTML = 
			( this.lng === 'en' ? this.profile.account.cus_food_type_en : this.profile.account.cus_food_type_es );
		document.getElementById('appBusDesc').innerHTML = 
			( this.lng === 'en' ? this.profile.account.cus_bus_desc_en : this.profile.account.cus_bus_desc_es );

		let chkEng = document.getElementById("switchEnglish");
		let chkSpa = document.getElementById("switchSpanish");
		if( this.lng === "en" ) {
			chkSpa.removeAttribute("checked");
			chkEng.setAttribute("checked", "checked");
		} else {
			chkEng.removeAttribute("checked");
			chkSpa.setAttribute("checked", "checked");
		}

		this.Utl.appLogger( "Categories for offCanvas menu", this.profile.categories );
		let menuList = document.getElementById("appMenuList");														//- Get menu list element div

		
		this.profile.categories.forEach( function(cat) {															//- Create Menu on canvas' menu
			let anchor = document.createElement("a");																//- Create an anchor

			anchor.setAttribute("id", "menuCat-" + cat.cat_position);												//- Add item ID attribute
			anchor.setAttribute("name", cat.cat_position);															//- Add item NAME attribute
			anchor.addEventListener("click", ( args ) => {															//- Add eventListen to click
				self.Utl.appLogger( "menu Item clicked: ", args );
				const itemIndex 	= parseInt( args.target.name );													//- Get item index
				const itemLocation 	= "appMenuItem" + itemIndex;													//- Set item ID based on index
				const scrollToItem 	= document.getElementById( itemLocation );										//- Get item element
				const itemStatus 	= scrollToItem.getAttribute("status");											//- Get item current status
				//const itemStatus = document.getElementById( itemLocation ).getAttribute("status");

				if( itemStatus === "closed" || itemStatus === null ) {												//- If menu items container is closed
					document.getElementsByClassName("accordion-button")[itemIndex].click();							//- Click accordion to open
				}

				document.getElementsByClassName("btn-close")[0].click();											//- Close menu canvas by clicking close button


				let timerId = setInterval(function() {																//- Set timer to
					scrollToItem.scrollIntoView( { behavior: "smooth",  inline:  'start', block: "start" } );		//- scroll menu items into view
					clearInterval(timerId);																			//- Clear timer
				}, 750);

				self.Utl.appLogger( "itemLocation: ", itemLocation );

			});

			anchor.setAttribute("data-rr-ui-event-key", "#menuCat-" + cat.cat_position);							//- Set item event-key
			anchor.setAttribute("class", "list-group-item list-group-item-light list-group-item-action");			//- Add item classes
			anchor.innerHTML = ( self.lng === 'en' ? cat.cat_desc_en : cat.cat_desc_es );							//- Set item title based on selected language
			menuList.append(anchor);																				//- Add item to menu list
		});
	}

    
    render() {
        return(
            <>
            <div className="row">
				<div className="col-lg-12">
					<Navbar id="appNavbar" collapseOnSelect  expand="sm" data-bs-theme="dark">
						<Container>
							<Navbar.Brand href="#home" className='app-header-brand' onClick={this.handleShow}>
								<FaUtensils className='me-2' />
								<FaBars className='me-2' />
								<span className="acctBusName"></span>
							</Navbar.Brand>
							<a href="#_" className='app-header-lang ms-4' onClick={this.handleLanguage}>
								<GrLanguage className='me-1' /> 
								<FormattedMessage
                                    id = "app.menu-language"
                                    defaultMessage="English"
                                />
							</a>
                            <a id="appNavToMap" href="#_" className='text-dark' onClick={this.scrollToMap}>
                                <FaMapLocationDot className='me-2' />
                                <FormattedMessage
                                    id = "app-nav-view-map"
                                    defaultMessage="View map"
                                />
                            </a>
						</Container>
					</Navbar>
				</div>
			</div>
            <Offcanvas show={this.state.show} onHide={this.handleClose} onShow={this.handleOffCanvas}>
                <Offcanvas.Header closeButton className="appHeaderCloseButton">
                    <Offcanvas.Title>
                        <FaUtensils className='me-2' />
                        <span id="acctBusNameCanvas"></span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <div><hr /></div>
                <Offcanvas.Body className='app-canvas-body'>
                    <h6><BiSolidDish className='app-icon-15' /> <span id="acctFoodTypeCanvas"></span></h6>
                    <div id="appBusDesc"></div>
                    <div><hr /></div>
                    <h6 className='text-center'><GrLanguage className='app-icon-15' /> <span>Language</span></h6>
                    <div className='text-center'>
                        <MDBSwitch className='me-2' id='switchEnglish' label='English' onClick={this.handleLanguage} />
                        <MDBSwitch className='me-2' id='switchSpanish' label='Español' onClick={this.handleLanguage} />
                    </div>
                    <div><hr /></div>
                    <h6 className='text-center'><GiHamburger className='app-icon-15' /> <span>Menu</span></h6>
                    <div id="appMenuCatList">
                        <ListGroup id="appMenuList" defaultActiveKey="#menuCat-0"></ListGroup>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            </>
        );
    }
}

export default AppNavbar;