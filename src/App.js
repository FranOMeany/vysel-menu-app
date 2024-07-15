/**
 *   Name: App.js
 * Author: Francisco J. O'Meany
 * Description: App function component for QR Menu applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import Header from './Components/Header/Header';
import AppNavbar from './Components/Navbar/Navbar';
import CarouselHead from './Components/Carousel/Carousel';
import MenuList from './Components/MenuList/MenuList';
import MapSection from './Components/Map/Map';
import ArrowUp from './Components/ArrowUp/ArrowUp';
import Footer from './Components/Footer/Footer';
import Utility from './Components/Utility/Utility';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
    constructor(props) {
      super(props);

      this.utl          = new Utility();                                                                        //- Load the Utility class
      this.lang 		    = this.utl.getCookie("appLang");                                                        //- Get current language
      this.profile	    = JSON.parse(localStorage.getItem('profile') );                                         //- Get profile information
      this.address      = this.profile.account.cus_bus_full_address;                                            //- Get business address
      this.zoom         = 15;                                                                                   //- Set map zoom
      this.busName      = this.profile.account.cus_bus_name;                                                    //- Get business name
      this.mapContent   = this.mapContent = ( this.lang === "es" ? this.profile.account.cus_bus_desc_es :       //- Get map content depending on
      this.profile.account.cus_bus_desc_en );                                                                   //- current language selection
      this.isCarousel   = ( this.profile.account.cus_bus_template === "2" ? true : false );                     //- Check if Carousel form is selected
      this.mounted	    = false;				                                                                        //- In React version 18, a change was made to strict mode so that components will mount, then unmount, then mount again. 
      //this.state        = {isData: false};
      console.log("Utility: ", this.utl);																						                            //- Show object to set debug on/off
    }

    componentDidMount() {
      const self = this;

      document.addEventListener('readystatechange', function() {                                                //- When component is mounted add EventListener
        if (document.readyState === 'complete') {                                                               //- When completed and 
            if( !self.mounted ) {                                                                               //- the component has not been mounted (is mounted twice by React)
                self.utl.appLogger('React app DOM fully loaded on App component. Lang is: ', 
                              self.lang);

                //self.utl.appLogger( "Profile after App mounted: ", JSON.parse(localStorage.getItem('profile')) );
                //self.profile = JSON.parse(localStorage.getItem('profile') );                                    //- Get profile information
                //self.address     = self.profile.account.cus_bus_full_address;                                   //- Get business address
                //self.busName     = self.profile.account.cus_bus_name;                                           //- Get business name
                //self.isCarousel  = ( self.profile.account.cus_bus_template === "2" ? true : false );            //- Check if Carousel form is selected
                //self.mapContent = ( self.lang === "es" ? self.profile.account.cus_bus_desc_es :                 //- Get map content depending on
                //self.profile.account.cus_bus_desc_en );                                                         //- current language selection
                self.mounted = true;
                //self.setState({isData: true});
                //self.utl.appLogger( "Header self: ", self );
              }
            }
      });
    }

    render() {
      this.utl.appLogger("Now rendering App...", this.profile);
      //this.utl.appLogger("State: ", this.state.isData );
      this.utl.appLogger("Carousel: ", this.isCarousel );
      return (                                                                                //- Render components
        <div className="App bg-white">
          <AppNavbar />
          {this.isCarousel ? <CarouselHead /> : <Header />}
          <MenuList />
          <MapSection address={this.address} lang={this.lang} zoom={this.zoom} heading={this.busName} content={this.mapContent}  />
          <ArrowUp />
          <Footer business={this.busName} lang={this.lang} />
        </div>
      );
    }
}

export default App;