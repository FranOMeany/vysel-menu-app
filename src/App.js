/**
 *   Name: App.js
 * Author: Francisco J. O'Meany
 * Description: App function component for QR Menu applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
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


function App() {
  let utl = new Utility();                                                                //- Load the Utility class
  const profile	  = JSON.parse(localStorage.getItem('profile'));                          //- Get profile information
  const address   = profile.account.cus_bus_full_address;                                 //- Get business address
  const lang 		  = utl.getCookie("appLang");                                             //- Get current language
  const zoom      = 15;                                                                   //- Set map zoom
  const busName   = profile.account.cus_bus_name;                                         //- Get business name
  const mapContent = ( lang === "es" ? profile.account.cus_bus_desc_es :                  //- Get map content depending on
                       profile.account.cus_bus_desc_en );                                 //- current language selection
  const isCarousel = ( profile.account.cus_bus_template === "2" ? true : false );         //- Check if Carousel form is selected
  utl.initialize();                                                                       //- Initialize application
  utl.appLogger( "Profile from App: ", profile );

  
  return (
    <div className="App bg-white">
      <AppNavbar />
      { isCarousel 
        ? <CarouselHead />
        : <Header />
      }
      <MenuList />
      <MapSection address={address} lang={lang} zoom={zoom} heading={busName} content={mapContent}  />
      <ArrowUp />
      <Footer business={busName} lang={lang} />
    </div>
  );
}

export default App;