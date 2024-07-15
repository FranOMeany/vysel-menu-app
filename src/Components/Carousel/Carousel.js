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
        this.state		= { img0: null, img1: null, img2: null, img3: null, img4: null };
		    this.Utl		  = new Utility();
        this.mounted	= false;				                  //- In React version 18, a change was made to strict mode so that components will mount, then unmount, then mount again. 
		    this.lng 		  = this.Utl.getCookie("appLang");
        this.images   = {0:null, 1:null, 2:null, 3:null, 4:null};
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
              self.Img0 = ( acct.cus_bus_carousel_img_0 !== null ? "./Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_0 : null);
              self.Img1 = ( acct.cus_bus_carousel_img_1 !== null ? "./Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_1 : null);
              self.Img2 = ( acct.cus_bus_carousel_img_2 !== null ? "./Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_2 : null);
              self.Img3 = ( acct.cus_bus_carousel_img_3 !== null ? "./Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_3 : null);
              self.Img4 = ( acct.cus_bus_carousel_img_4 !== null ? "./Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_4 : null);
              //- We have to setState for the image string to work on the src= parameter
              self.setState({ img0: self.Img0 });
              self.setState({ img1: self.Img1 });
              self.setState({ img2: self.Img2 });
              self.setState({ img3: self.Img3 });
              self.setState({ img4: self.Img4 });
              self.images = {0:self.Img0, 1:self.Img1, 2:self.Img2, 3:self.Img3, 4:self.Img4};

              //if( document.getElementById("appCarouselImg1") ) {
                //document.getElementById("appCarouselImg1").style.background = "background: linear-gradient(rgba(35, 35, 35, 0.5), rgba(35, 35, 35, 0.5)) 50% / cover no-repeat, url(" + self.state.img0 + ");";
              //}
            }
            self.mounted = true;
          }
        }
      });
    }

    renderItems = () => {
      this.Utl.appLogger( "Images: ", this.images );
      this.Utl.appLogger( "this: ", this );
      let theseItems = "";

      for( let x = 0; x < this.maxImg; x++ ) {
        let imgId = "appCarouselImg" + x;

        if( this.images[x] !== null ) {
          theseItems += 
          <Carousel.Item>
          <BusinessInfo index={x} />
          <img id={imgId} className="d-block w-100" src={this.images[x]} alt="" />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>          
          
        }
      }

      this.Utl.appLogger( "theseItems: ", theseItems );

      return( theseItems );




      /*
      for( let x = 0; x < this.maxImg; x++ ) {
        let imgId = "appCarouselImg" + x;

        return this.images[x] === null ? "" : 
        <Carousel.Item>
          <BusinessInfo index={x} />
          <img id={imgId} className="d-block w-100" src={this.images[x]} alt="" />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      }
      */

    }

    render() {
      /*
      const carouselItems = this.renderItems();
      
      return( 
        <Carousel data-bs-theme="dark" fade={true}>
            { carouselItems }
        </Carousel>
      );
      */
      

      
      const self = this;
      this.Utl.appLogger( "Carousel self: ", self );
      this.Utl.appLogger( "Images: ", this.images );
        return(
            <>
            <Carousel data-bs-theme="dark" fade={true}>
                {self.state.img0 !== null &&
                    
                    <Carousel.Item className='text-white'>
                      <BusinessInfo index={0} theme={self.profile.account.cus_bus_template} />
                      <img id="appCarouselImg0" className="d-block w-100" src={self.state.img0} alt="" />
                      <Carousel.Caption className='text-white z-3'>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                }
                {self.state.img1 !== null &&
                    <Carousel.Item className='text-white'>
                      <BusinessInfo index={1} theme={self.profile.account.cus_bus_template} />
                      <img className="d-block w-100" src={self.state.img1} alt="" />
                      <Carousel.Caption className='text-white z-3'>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                }
                {self.state.img2 !== null &&
                    <Carousel.Item className='text-white'>
                      <BusinessInfo index={2} theme={self.profile.account.cus_bus_template} />
                      <img className="d-block w-100" src={self.state.img2} alt="" />
                      <Carousel.Caption className='text-white z-3'>
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                }

                {self.state.img3 !== null &&
                    <Carousel.Item className='text-white'>
                      <BusinessInfo index={3} theme={self.profile.account.cus_bus_template} />
                      <img className="d-block w-100" src={self.state.img3} alt="" />
                      <Carousel.Caption className='text-white z-3'>
                        <h5>Fourth slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                }
                {self.state.img4 !== null &&
                    <Carousel.Item className='text-white'>
                      <BusinessInfo index={4} theme={self.profile.account.cus_bus_template} />
                      <img className="d-block w-100" src={self.state.img4} alt="" />
                      <Carousel.Caption className='text-white z-3'>
                        <h5>Fifth slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                }
            </Carousel>
            </>
        );
        
    }
}

export default CarouselHead;