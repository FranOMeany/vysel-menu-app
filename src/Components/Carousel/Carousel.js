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
import './Carousel.css';

class CarouselHead extends React.Component {
    constructor( props ) {
        super(props);
		    this.profile	= null;
        this.state		= { img0: null, img1: null, img2: null, img3: null, img4: null };
		    this.Utl		  = new Utility();
        this.mounted	= false;				                  //- In React version 18, a change was made to strict mode so that components will mount, then unmount, then mount again. 
		    this.lng 		  = this.Utl.getCookie("appLang");
    }

    componentDidMount() {
      const self		= this;
  
      document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
          if( !self.mounted ) {
            self.profile = JSON.parse(localStorage.getItem('profile'));
            if (self.profile) {
              const acct = self.profile.account;
              self.Img0 = ( acct.cus_bus_carousel_img_0 !== null ? "../../src/Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_0 : null);
              self.Img1 = ( acct.cus_bus_carousel_img_1 !== null ? "../../src/Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_1 : null);
              self.Img2 = ( acct.cus_bus_carousel_img_2 !== null ? "../../src/Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_2 : null);
              self.Img3 = ( acct.cus_bus_carousel_img_3 !== null ? "../../src/Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_3 : null);
              self.Img4 = ( acct.cus_bus_carousel_img_4 !== null ? "../../src/Assets/images/" + acct.cus_account + "/" + acct.cus_bus_carousel_img_4 : null);
              //- We have to setState for the image string to work on the src= parameter
              self.setState({ img0: self.Img0 });
              self.setState({ img1: self.Img1 });
              self.setState({ img2: self.Img2 });
              self.setState({ img3: self.Img3 });
              self.setState({ img4: self.Img4 });
            }
            self.mounted = true;
          }
        }
      });
    }

    render() {
      const self = this;
      this.Utl.appLogger( "Carousel self: ", self );
        return(
            <>
            <Carousel data-bs-theme="dark" fade={true}>
                {self.state.img0 !== null &&
                    <Carousel.Item>
                      <img className="d-block w-100" src={self.state.img0} alt="" />
                      <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                }
                {self.state.img1 !== null &&
                    <Carousel.Item>
                      <img className="d-block w-100" src={self.state.img1} alt="" />
                      <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                }
                {self.state.img2 !== null &&
                <Carousel.Item>
                  <img className="d-block w-100" src={self.state.img2} alt="" />
                  <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                }

                {self.state.img3 !== null &&
                <Carousel.Item>
                  <img className="d-block w-100" src={self.state.img3} alt="" />
                  <Carousel.Caption>
                    <h5>Fourth slide label</h5>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                }
                {self.state.img4 !== null &&
                <Carousel.Item>
                  <img className="d-block w-100" src={self.state.img4} alt="" />
                  <Carousel.Caption>
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