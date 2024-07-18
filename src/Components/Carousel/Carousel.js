/**
 *   Name: Carousel.js
 * Author: Francisco J. O'Meany
 * Description: Carousel class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Utility from '../Utility/Utility';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import './Carousel.css';

class CarouselHead extends React.Component {
    constructor( props ) {
        super(props);
		    this.profile	= null;
		    this.Utl		  = new Utility();
        this.mounted	= false;				                  //- In React version 18, a change was made to strict mode so that components will mount, then unmount, then mount again. 
		    this.lng 		  = this.Utl.getCookie("appLang");
        this.state		= { images: [] };
        this.maxImg   = 4;
    }

    componentDidMount() {
      const self		= this;
  
      document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
          if( !self.mounted ) {
            self.Utl.appLogger('React app DOM fully loaded on Carousel component. Lang is: ', 
              self.lng);
            self.profile = JSON.parse(localStorage.getItem('profile'));
            if (self.profile) {
              const acct = self.profile.account;
              self.images = new Array();
              self.images[0] = { image: ( acct.cus_bus_carousel_img_0 !== null ? "./accounts/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_0 : null ), title: "First slide" };
              self.images[1] = { image: ( acct.cus_bus_carousel_img_1 !== null ? "./accounts/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_1 : null ), title: "Second slide" };
              self.images[2] = { image: ( acct.cus_bus_carousel_img_2 !== null ? "./accounts/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_2 : null ), title: "Third slide" };
              self.images[3] = { image: ( acct.cus_bus_carousel_img_3 !== null ? "./accounts/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_3 : null ), title: "Fourth slide" };
              self.images[4] = { image: ( acct.cus_bus_carousel_img_4 !== null ? "./accounts/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_4 : null ), title: "Fifth slide" };

              self.images = self.images.filter(function( item ) {
                return item.image !== null
              });

              self.setState(state => {                                                                          //- We have to setState for the image string to work on the <img src= parameter
              const images = self.images.map( item => item );                                                   //- The correct way to set array states in a class component
                self.Utl.appLogger( "items: ", images );
                return {
                  images,
                };
              });
            }
            self.mounted = true;
          }
        }
      });
    }

    renderItems = ( images ) => {
      const self = this;
      this.Utl.appLogger( "images: ", images );

      return !images ? "" : images.map((img, index) => (
        <Carousel.Item className='text-white' key={index}>
          <BusinessInfo id={"appCarouselImg" + index} addClass={""} index={index} theme={self.profile.account.cus_bus_template} />
          <img id={"appCarouselImg" + index} className="d-block w-100" src={img.image} alt="" />
          <Carousel.Caption className='text-white z-3'>
            <h5>{img.title}</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ));
    }

    render() {
      const carouselItems = this.renderItems( this.state.images );
      
      return( 
        <Carousel data-bs-theme="dark" fade={true}>
            { carouselItems }
        </Carousel>
      );
      
    }
}

export default CarouselHead;