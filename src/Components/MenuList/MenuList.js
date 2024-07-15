/**
 *   Name: MenuList.js
 * Author: Francisco J. O'Meany
 * Description: MenuList class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import { createPortal } from 'react-dom';
import Utility from '../Utility/Utility';
import ModalBox from '../ModalBox/ModalBox';
import Accordion from 'react-bootstrap/Accordion';
import "./MenuList.css";

class MenuList extends React.Component {
    constructor( props ) {
        super(props);
        this.Utl        = new Utility();                                                                        //- Load our Utility class
        this.mounted	= false;				                                                                //- In React version 18, a change was made to strict mode so 
        this.lng 		= this.Utl.getCookie("appLang");                                                        //- that components will mount, then unmount, then mount again. 
        this.profile 	= JSON.parse(localStorage.getItem('profile'));                                          //- Get current profile information
        this.zoom       = 15;
        this.address    = this.profile.account.cus_bus_full_address;                                            //- Get account address
        this.heading    = this.profile.account.cus_bus_name;                                                    //- Set account heading
        this.mapContent = 
        ( this.lng === "es" ? this.profile.account.cus_bus_desc_es : this.profile.account.cus_bus_desc_en );    //- Get map content
        this.state		= { collapse: false, showModal: false };                                                //- Set component state
        this.handleModalExit = this.handleModalExit.bind(this);                                                 //- Bind the modal dialog
    }

    componentDidMount() {                                                                                       //- Component is mounted
        const self		= this;                                                                                 //- Set self for future reference

        document.addEventListener('readystatechange', function() {                                              //- When component is mounted add EventListener
			if (document.readyState === 'complete') {                                                           //- When completed and 
				if( !self.mounted ) {                                                                           //- the component has not been mounted (is mounted twice by React)
                    self.Utl.appLogger('React app DOM fully loaded on MenuList component. Lang is: ', 
                            self.lng);

                    if( self.profile.categories ) {
                        self.profile.categories.forEach( function( cat ) {                                      //- Go through each category template
                            let menuHeader = document.getElementById( "appItemHeader" + cat.cat_position );     //- Get template header element and
                            menuHeader.innerHTML = ( self.lng === 'en' ? cat.cat_desc_en : cat.cat_desc_es );   //- add the corresponding language text
                            let catImage = "./assets/images/samples/" + cat.cat_image;                          //- Get category image
                            document.getElementById( "appCatImage" + 
                                                    cat.cat_position ).setAttribute( "src", catImage );         //- Set category image
                        });
                    }

                    if( self.profile.displayItems[0].itm_group !== undefined && self.profile.categories ) {     //- If we have items on this profile
                        let imgPath = "./assets/images/";                                                       //- Set images path
                        let thisGroup = self.profile.displayItems[0].itm_group;                                 //- Get current group
                        let groupId = "appFoodItems" + thisGroup;                                               //- Get group ID
                        let itemsGroup = document.getElementById( groupId );                                    //- Get group element
                        let menuRow = document.createElement( "div" );                                          //- Create menu row element
                        menuRow.setAttribute( "class", "row" );                                                 //- Set menu row class
                        let menuCol = document.createElement( "div" );                                          //- Create menu column
                        menuCol.setAttribute( "class", "col-md-3 mb-3 d-flex align-items-stretch app-menu-items" );     //- Set menu column classes
                        let menuCrd = document.createElement( "div" );                                          //- Create card element
                        menuCrd.setAttribute( "class", "card app-card-width app-card-display" );                //- Set card class

                        let colItems = 0;                                                                       //- Column items
                        self.profile.displayItems.forEach( function( item ) {                            
                            if( thisGroup !== item.itm_group || colItems === 4 ) {                              //- If different group or items on this row reach 4
                                itemsGroup = document.getElementById( groupId );                                //- Get group ID
                                itemsGroup.append( menuRow );                                                   //- Append current row to menu section
                                colItems = 0;                                                                   //- Set column items to 0
                                menuRow = document.createElement( "div" );                                      //- Redifine new menu row element
                                menuRow.setAttribute( "class", "row" );                                         //- Set class attribute to new row element

                                thisGroup = item.itm_group;                                                     //- Set new current group
                                groupId = "appFoodItems" + thisGroup;                                           //- Set new group ID
                            }

                            if( item.itm_account !== null ) {                                                   //- If item account is not NULL
                                let acctPath = imgPath + item.itm_account;                                      //- Set account path
                                
                                //- Create item image div
                                let imgDiv = document.createElement( "div" );
                                imgDiv.setAttribute( "class", "app-card-img" );                                 //- Set image div attribute
                                let imgSrc = document.createElement( "img" );                                   //- Create image element
                                imgSrc.setAttribute( "alt", ( self.lng === "es" ? 
                                    item.itm_title_es : item.itm_title_en ) );                                  //- Set image alt attribute with current language
                                imgSrc.setAttribute( "src", ( item.itm_image_location === "" ||                 //- Set image src attibute
                                    item.itm_image_location === null ? acctPath + "/" + item.itm_image : item.itm_image_location + "/" + item.itm_image ) + "?fit=crop&fm=jpg&h=375&w=500" );
                                imgDiv.append( imgSrc );                                                        //- Append image element to image div

                                //- Create item body
                                let bodyDiv = document.createElement( "div" );                                  //- Create item body div element
                                bodyDiv.setAttribute( "class", "card-body d-flex flex-column" );                //- Set div class attribute
                                let itemTitle = document.createElement( "h5" );                                 //- Create H5 item title element
                                itemTitle.setAttribute( "class", "card-title" );                                //- Set itme title class attribute
                                itemTitle.innerHTML = ( self.lng === "es" 
                                    ? item.itm_title_es : item.itm_title_en );                                  //- Set item title with current language
                                let itemDesc = document.createElement( "p" );                                   //- Create item p element
                                itemDesc.innerHTML = ( self.lng === "es" ? 
                                    item.itm_desc_es : item.itm_desc_en );                                      //- Set item description with current language
                                bodyDiv.append( itemTitle );                                                    //- Append item title to body div
                                bodyDiv.append( itemDesc );                                                     //- Append itme description to body div

                                //- Create item price
                                let itemPrice = document.createElement( "div" );                                //- Create item price div element
                                itemPrice.setAttribute( "class", "app-card-outmore" );                          //- Set item price div class attribute
                                let itemPriceAmt = document.createElement( "h5" );                              //- Create h5 item price amount element
                                itemPriceAmt.setAttribute( "class", "app-card-price" );                         //- Set item price class attribute
                                itemPriceAmt.innerHTML = "$" + item.itm_price;                                  //- Set item price
                                itemPrice.append( itemPriceAmt );                                               //- Append item price amount to item price element

                                //- Item group name
                                const itemGroupName = ( self.lng === 'es' ? self.profile.categories[item.itm_group].cat_desc_es : self.profile.categories[item.itm_group].cat_desc_en );
                                menuCrd = document.createElement( "div" );                                      //- Create menu card div element
                                menuCrd.setAttribute( "class", "card app-card-width app-card-display" );        //- Set menu card div class attribute
                                menuCrd.setAttribute( "data-parent-group", itemGroupName );                     //- Set menu card div data-parent-group attribute

                                //- Fill card
                                menuCrd.append( imgDiv );                                                       //- Append image to card
                                menuCrd.append( bodyDiv );                                                      //- Append body to card
                                menuCrd.append( itemPrice );                                                    //- Append item price to card

                                menuCol = document.createElement( "div" );                                      //- Create column div element
                                menuCol.setAttribute( "class", "col-md-3 mb-3 d-flex align-items-stretch app-menu-items" );     //- Set column class attribute

                                //- Set item
                                menuCol.append( menuCrd );                                                      //- Append menu card to column div
                                menuRow.append( menuCol );                                                      //- Append column div to row
                            }

                            colItems++;                                                                         //- Count number of col items
                        });

                        itemsGroup = document.getElementById( groupId );                                        //- Get items group
                        if( itemsGroup !== null ) {                                                             //- If items group is not null
                            itemsGroup.append( menuRow );                                                       //- Append row to the items group
                        }
                    }

                    const items = document.getElementsByClassName("app-menu-items");                            //- Get all menu items
                    for( let x = 0; x < items.length; x++ ) {                                                   //- Loop through each menu item
                        items[x].children[0].addEventListener( "click", function( e ) {                         //- Add a click event listener for each item
                            self.Utl.appLogger("item: ", items[x].children[0] );

                            const menuItemShown = items[x].children[0];                                         //- Get menu item
                            const menuGroupName = menuItemShown.getAttribute( "data-parent-group" );            //- Get menu item group name
                            self.Utl.appLogger("Item group name: ", menuGroupName );

                            self.setState({showModal: true});                                                   //- Change state to show modal dialog

                            let timerId = setInterval(function() {                                              //- Set an interval timer and
                                const appDiv = document.getElementById( "appMenuDescription" );                 //- get the dialog body div
                                if( appDiv !== null ) {                                                         //- If dialog body is available then
                                    document.getElementById( "contained-modal-title-vcenter" ).innerHTML =      //- Set dialog header title with the
                                            menuGroupName;                                                      //- group name
                                    const clonedItem = menuItemShown.cloneNode( true );                         //- Clone the menu item and
                                    appDiv.append(clonedItem);                                                  //- append it to the dialog body
                                    clearInterval(timerId);                                                     //- Clear the interval
                                }
		                    }, 75);                                                                             //- Interval every 75 millisecs
                        })
                    }
                    self.mounted = true;                                                                        //- This component has been mounted and completed
                }
            }
        });
    }

    handleOnEnter = ( itemKey ) => {                                                                            //- Handle onEnter for each item group (Accordion)
        this.Utl.appLogger( "onEnter Item clicked: ", itemKey );
        this.setMenuStatus( itemKey );                                                                          //- Set menu status (see function below)
        this.setState({ collapse: !this.state.collapse });                                                      //- Set collapse state
    }

    handleOnExit = ( itemKey ) => {                                                                             //- Handle onExit for each item group (Accordion)
        this.Utl.appLogger( "onExit Item clicked: ", itemKey );
        this.setMenuStatus( itemKey );                                                                          //- Set menu status (see function below)
        this.setState({ collapse: !this.state.collapse });                                                      //- Set collapse state
    }

    setMenuStatus = ( itemKey ) => {
        const itemIndex = parseInt( itemKey.childNodes[0].getAttribute("data-index") );                         //- Get group item index
        const itemLocation = "appMenuItem" + itemIndex;                                                         //- Get item group ID
        const itemStatus = document.getElementById( itemLocation ).getAttribute("status");                      //- Get item group status attribute
        document.getElementById( itemLocation ).setAttribute( "status", 
            ( itemStatus === "closed" || itemStatus === null ? "open" : "closed" ) );                           //- Set item group status ( open or closed )
    }

    handleModalExit = (e) => {                                                                                  //- Handle modal dialog box
        this.setState({showModal: false});                                                                      //- Set modal dialog box show status
    }

    renderCategories = ( categories ) => {                                                                      //- Render item group categories
        return !categories ? "" : categories.map((cat, index) => (                                              //- A unique key is required by react
            <Accordion.Item eventKey={cat.cat_position} id={"appMenuItem" + cat.cat_position} key={cat.cat_position}>
                <Accordion.Header><h4 className='me-2'>
                    <img id={"appCatImage" + cat.cat_position}  src="" alt="" className='app-cat-image' />
                    </h4><h4 id={"appItemHeader" + cat.cat_position}>Menu #{cat.cat_position}</h4>
                </Accordion.Header>
                <Accordion.Body id={"appFoodItems" + cat.cat_position} onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index={cat.cat_position}>
                </Accordion.Body>
            </Accordion.Item>
        ));
    }
    
    render () {
        const categories = this.renderCategories( this.profile.categories );                                    //- Render all categories

        return(                                                                                                 //- Return all rendered categories and render a dialog modal box
            <>
            <Accordion id="appMenuItemsDesc" className='mt-2' alwaysOpen="true">
                { categories }
            </Accordion>
            {this.state.showModal &&
                createPortal( <ModalBox show={true} onExit={this.handleModalExit} title={''} closeBtn={this.lng === 'es' ? "Cierre" : "Close"} />, document.body )
            }
            </>
        );
    }
}

export default MenuList;