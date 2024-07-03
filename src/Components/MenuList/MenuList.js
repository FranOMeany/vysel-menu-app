/**
 *   Name: MenuList.js
 * Author: Francisco J. O'Meany
 * Description: MenuList class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import Utility from '../Utility/Utility';
import Accordion from 'react-bootstrap/Accordion';
import { IoFastFood } from "react-icons/io5";
import "./MenuList.css";

class MenuList extends React.Component {
    constructor( props ) {
        super(props);
        this.Utl        = new Utility();                                                                        //- Load our Utility class
        this.mounted	= false;				                                                                //- In React version 18, a change was made to strict mode so 
        this.lng 		= this.Utl.getCookie("appLang");                                                        //- that components will mount, then unmount, then mount again. 
        this.profile 	= JSON.parse(localStorage.getItem('profile'));                                          //- Get current profile information
        this.zoom       = 15;
        this.address    = this.profile.account.cus_bus_full_address;
        this.heading    = this.profile.account.cus_bus_name;
        this.mapContent = 
        ( this.lng === "es" ? this.profile.account.cus_bus_desc_es : this.profile.account.cus_bus_desc_en );
        this.state		= { collapse: false };

        this.Utl.appLogger("this class: ", this );
        this.Utl.appLogger("Profile from MenuList: ", this.profile );
    }

    componentDidMount() {
        const self		= this;

        document.addEventListener('readystatechange', function() {                                              //- When component is mounted add EventListener
			if (document.readyState === 'complete') {                                                           //- When completed and 
				if( !self.mounted ) {                                                                           //- the component has not been mounted (is mounted twice by React)
                    self.Utl.appLogger('React app DOM is fully loaded on MenuList component. Language is: ', 
                            self.lng);

                    let accord 		= document.getElementById("appMenuItemsDesc");                              //- Get the accordion templates list
					let liveItems 	= self.profile.categories.length;                                           //- Get the current categories length and
					for( let x = liveItems; x < 20; x++ ) {                                                     //- Go through the rest of the templates
						let menuItem = document.getElementById( "appMenuItem" + x );                            //- One by one and then
						accord.removeChild( menuItem );                                                         //- Remove it
					}

					self.profile.categories.forEach( function( cat ) {                                          //- Go through each category template
						let menuHeader = document.getElementById( "appItemHeader" + cat.cat_position );         //- Get template header element and
						menuHeader.innerHTML = ( self.lng === 'en' ? cat.cat_desc_en : cat.cat_desc_es );       //- add the corresponding language text
					});

                    if( self.profile.displayItems[0].itm_group !== undefined ) {                                //- If we have items on this profile
                        let imgPath = "/src/Assets/images/";                                                    //- Set images path
                        let thisGroup = self.profile.displayItems[0].itm_group;                                 //- Get current group
                        let groupId = "appFoodItems" + thisGroup;                                               //- Get group ID
                        let itemsGroup = document.getElementById( groupId );                                    //- Get group element
                        let menuRow = document.createElement( "div" );                                          //- Create menu row element
                        menuRow.setAttribute( "class", "row" );                                                 //- Set menu row class
                        let menuCol = document.createElement( "div" );                                          //- Create menu column
                        menuCol.setAttribute( "class", "col-md-3 mb-3 d-flex align-items-stretch" );            //- Set menu column class
                        let menuCrd = document.createElement( "div" );                                          //- Create card element
                        menuCrd.setAttribute( "class", "card app-card-width app-card-display" );                //- Set card class

                        let colItems = 0;                                                                       //- Column items

                        self.profile.displayItems.forEach( function( item ) {
                            //- If different group or items on this row reach 4
                            if( thisGroup !== item.itm_group || colItems === 4 ) {
                                //- Append current row to menu section
                                itemsGroup = document.getElementById( groupId );
                                itemsGroup.append( menuRow );
                                colItems = 0;

                                //- Redifine new menu row
                                menuRow = document.createElement( "div" );
                                menuRow.setAttribute( "class", "row" );

                                //- Set current group
                                thisGroup = item.itm_group;
                                groupId = "appFoodItems" + thisGroup;
                            }

                            let acctPath = imgPath + item.itm_account;
                            //- Create item image
                            let imgDiv = document.createElement( "div" );
                            imgDiv.setAttribute( "class", "app-card-img" );
                            let imgSrc = document.createElement( "img" );
                            imgSrc.setAttribute( "alt", ( self.lng === "es" ? item.itm_title_es : item.itm_title_en ) );
                            imgSrc.setAttribute( "src", ( item.itm_image_location === "" || item.itm_image_location === null ? acctPath + "/" + item.itm_image : item.itm_image_location + "/" + item.itm_image ) + "?fit=crop&fm=jpg&h=375&w=500" );
                            imgDiv.append( imgSrc );

                            //- Create item body
                            let bodyDiv = document.createElement( "div" );
                            bodyDiv.setAttribute( "class", "card-body d-flex flex-column" );
                            let itemTitle = document.createElement( "h5" );
                            itemTitle.setAttribute( "class", "card-title" );
                            itemTitle.innerHTML = ( self.lng === "es" ? item.itm_title_es : item.itm_title_en );
                            let itemDesc = document.createElement( "p" );
                            itemDesc.innerHTML = ( self.lng === "es" ? item.itm_desc_es : item.itm_desc_en );
                            bodyDiv.append( itemTitle );
                            bodyDiv.append( itemDesc );

                            //- Create item price
                            let itemPrice = document.createElement( "div" );
                            itemPrice.setAttribute( "class", "app-card-outmore" );
                            let itemPriceAmt = document.createElement( "h5" );
                            itemPriceAmt.setAttribute( "class", "app-card-price" );
                            itemPriceAmt.innerHTML = "$" + item.itm_price;
                            itemPrice.append( itemPriceAmt );

                            menuCrd = document.createElement( "div" );
                            menuCrd.setAttribute( "class", "card app-card-width app-card-display" );

                            //- Fill card
                            menuCrd.append( imgDiv );
                            menuCrd.append( bodyDiv );
                            menuCrd.append( itemPrice );

                            menuCol = document.createElement( "div" );
                            menuCol.setAttribute( "class", "col-md-3 mb-3 d-flex align-items-stretch" );

                            //- Set item
                            menuCol.append( menuCrd );
                            menuRow.append( menuCol );

                            colItems++;
                        });

                        itemsGroup = document.getElementById( groupId );
                        itemsGroup.append( menuRow );
                    }

                    self.mounted = true;                                                                        //- This component has been mounted and completed
                }
            }
        });
    }

    


    handleOnEnter = ( itemKey ) => {
        this.Utl.appLogger( "onEnter Item clicked: ", itemKey );
        this.setMenuStatus( itemKey );
        this.setState({ collapse: !this.state.collapse });
    }

    handleOnExit = ( itemKey ) => {
        this.Utl.appLogger( "onExit Item clicked: ", itemKey );
        this.setMenuStatus( itemKey );
        this.setState({ collapse: !this.state.collapse });
    }

    setMenuStatus = ( itemKey ) => {
        const itemIndex = parseInt( itemKey.childNodes[0].getAttribute("data-index") );
        const itemLocation = "appMenuItem" + itemIndex;
        const itemStatus = document.getElementById( itemLocation ).getAttribute("status");
        document.getElementById( itemLocation ).setAttribute( "status", ( itemStatus === "closed" || itemStatus === null ? "open" : "closed" ) );
    }

    render () {
        return(
            <>
            <Accordion id="appMenuItemsDesc" className='mt-2' alwaysOpen="true">
                <Accordion.Item eventKey="0" id="appMenuItem0">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader0">Menu #1</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems0" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="0">
                    {/*
                    <div className="row">
                        <div className="col-md-3 mb-3 d-flex align-items-stretch">
                            <div className="card app-card-width app-card-display">
                                <div className='app-card-img'>
                                    <img className="card-img-top" alt="" src="/src/Assets/images/food_girl.jpg?fit=crop&fm=jpg&h=375&w=500" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Pollo Tortelloni Alfredo</h5>
                                    <p className="card-text mb-4">Tortellini relleno de queso Asiago hornado en alfredo con una mezcla de quesos Italianos y pan molido tostado y cubierto de piezas de pollo asado.</p>
                                </div>
                                <div className="app-card-outmore">
                                    <h5 className="app-card-price">$23.49</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3 d-flex align-items-stretch">
                            <div className="card app-card-width app-card-display">
                                <div className='app-card-img'>
                                    <img className="card-img-top" alt="" src="https://images.unsplash.com/photo-1615996001375-c7ef13294436?fit=crop&fm=jpg&h=375&w=500" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Card Title</h5>
                                    <p className="card-text mb-4"><span>We respect your privacy.</span></p>
                                </div>
                                <div className="app-card-outmore">
                                    <h5 className="app-card-price">$7.99</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3 d-flex align-items-stretch">
                            <div className="card app-card-width app-card-display">
                                <div className="app-card-img">
                                    <img className="card-img-top" alt="" src="https://images.unsplash.com/photo-1573225342356-dcf083550790?w=500&auto=format&fit=crop" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Card Title</h5>
                                    <p className="card-text mb-4">
                                        We respect your privacy.
                                    </p>
                                </div>
                                <div className="app-card-outmore">
                                    <h5 className="app-card-price">$7.99</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3 d-flex align-items-stretch">
                            <div className="card app-card-width app-card-display">
                                <div className="app-card-img">
                                    <img className="card-img-top" alt="" src="https://images.unsplash.com/photo-1574484284002-952d92456975?fit=crop&fm=jpg&h=375&w=500" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Pollo Tortelloni Alfredo</h5>
                                    <p className="card-text mb-4">
                                        Tortellini relleno de queso Asiago hornado en alfredo con una mezcla de quesos Italianos y pan molido tostado y 
                                        cubierto de piezas de pollo asado.
                                    </p>
            			        </div>
                                <div className="app-card-outmore">
                                    <h5 className="app-card-price">$23.49</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 mb-3 d-flex align-items-stretch">
                            <div className="card app-card-width app-card-display">
                                <div className="app-card-img">
                                    <img className="card-img-top" alt="" src="https://plus.unsplash.com/premium_photo-1716892885706-6ddba966e05f?q=80&w=388&auto=format&fit=crop" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Pollo Tortelloni Alfredo</h5>
                                    <p className="card-text mb-4">
                                        Tortellini relleno de queso Asiago hornado en alfredo con una mezcla de quesos Italianos y pan molido tostado y 
                                        cubierto de piezas de pollo asado.
                                    </p>
            			        </div>
                                <div className="app-card-outmore">
                                    <h5 className="app-card-price">$23.49</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3 d-flex align-items-stretch">
                            <div className="card app-card-width app-card-display">
                                <div className="app-card-img">
                                    <img className="card-img-top" alt="" src="https://images.unsplash.com/photo-1550586554-a5a846e56593?w=500&auto=format&fit=crop" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Card Title</h5>
                                    <p className="card-text mb-4">
                                        We respect your privacy.
                                    </p>
                                </div>
                                <div className="app-card-outmore">
                                    <h5 className="app-card-price">$7.99</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" id="appMenuItem1">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader1">Menu #2</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems1" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="1"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" id="appMenuItem2">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader2">Menu #3</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems2" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="2"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" id="appMenuItem3">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader3">Menu #4</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems3" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="3"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4" id="appMenuItem4">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader4">Menu #5</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems4" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="4"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5" id="appMenuItem5">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader5">Menu #6</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems5" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="5"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6" id="appMenuItem6">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader6">Menu #7</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems6" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="6"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7" id="appMenuItem7">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader7">Menu #8</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems7" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="7"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8" id="appMenuItem8">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader8">Menu #9</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems8" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="8"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9" id="appMenuItem9">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader9">Menu #10</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems9" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="9"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="10" id="appMenuItem10">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader10">Menu #11</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems10" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="10"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="11" id="appMenuItem11">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader11">Menu #12</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems11" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="11"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="12" id="appMenuItem12">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader12">Menu #13</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems12" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="12"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="13" id="appMenuItem13">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader13">Menu #14</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems13" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="13"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="14" id="appMenuItem14">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader14">Menu #15</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems14" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="14"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="15" id="appMenuItem15">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader15">Menu #16</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems15" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="15"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="16" id="appMenuItem16">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader16">Menu #17</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems16" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="16"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="17" id="appMenuItem17">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader17">Menu #18</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems17" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="17"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="18" id="appMenuItem18">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader18">Menu #19</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems18" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="18"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="19" id="appMenuItem19">
                    <Accordion.Header><h4 className='me-2'><IoFastFood /></h4><h4 id="appItemHeader19">Menu #20</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems19" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="19"></Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </>
        );
    }
}

export default MenuList;