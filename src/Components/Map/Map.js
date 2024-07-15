/**
 *   Name: Map.js
 * Author: Francisco J. O'Meany
 * Description: Google Map class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React, { Component } from 'react';
import Utility from '../Utility/Utility';
import { FormattedMessage } from 'react-intl';
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineLaunch } from "react-icons/md";
import { Loader } from '@googlemaps/js-api-loader';
import './Map.css';

class MapSection extends Component {
    constructor(props) {
        super(props);
        this.mounts     = 0;                                                                                        //- How many times this component is mounted
        this.Utl        = new Utility();                                                                            //- Get an instance of our Utility class
        this.mounted	= false;																					//- In React version 18, a change was made to strict mode so 
        this.state      = {isLoaded: false};                                                                        //- that components will mount, then unmount, then mount again. 
    }

    componentDidMount() {                                                                                           //- Component is mounted
        const self = this;                                                                                          //- Set self as our class for future reference
        const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;                                                        //- Get our API Key

        document.addEventListener('readystatechange', function() {                                                  //- When component is mounted add EventListener
            if (document.readyState === 'complete') {                                                               //- When completed and 
                self.Utl.appLogger( "mounted: ", self.mounts );
                self.mounts++;
                if( !self.mounted ) {                                                                               //- the component has not been mounted (is mounted twice by React)
                    const language = self.props.lang;                                                               //- Set language
                    self.Utl.appLogger('React app DOM fully loaded on Map component. Lang is: ', language);	        //- Log mounted event and show current language

                    const loader = new Loader({                                                                     //- Set loader parameters
                        apiKey: apiKey,
                        version: "weekly",
                        libraries: ["places"],
                        language: language.toUpperCase()                                                            //- Google recognizes the location in UPPER CASE ONLY!!!
                    });
                    
                    const defaultMapOptions = {                                                                     //- Set default map options
                        zoom: self.props.zoom,
                        mapId: 'VYSEL_MAP_ID'                                                                       //- Required for AdvancedMarkerElement
                    };

                    self.Utl.appLogger("Start loading map...");
                    //loader.load().then((google) => {
                    loader.load().then( async ( google ) => {                                                       //- Load google maps
                        google.maps.importLibrary("marker");                                                        //- Import the marker library (used to pop-up busness information)
                        const geocoder = new google.maps.Geocoder();                                                //- Get geocoder instance
                        self.Utl.appLogger("Start geocode call...");
                        geocoder.geocode( { 'address': self.props.address}, function(results, status) {             //- Load geocoder to get current address' location map
                            self.Utl.appLogger("returned from Geocode");
                            const heading = self.props.heading;                                                     //- Set heading
                            const content = self.props.content;                                                     //- Set content
                            const address = self.props.address;                                                     //- Set address
            
                            if (status === 'OK') {
                                self.addr = results[0];                                                             //- Get address results
                                const addr = results[0];
                                const mapUrl = "https://www.google.com/maps/search/?api=1&query=" +                 //- Set map url based on
                                                addr.geometry.location.lat() + "%2C" +                              //- address latitude 
                                                addr.geometry.location.lng() + "&query_place_id=" +                 //- address longitude and
                                                addr.place_id + "&hl=" + self.props.lang.toUpperCase();             //- place id (set and used by Google)
            
                                const mapMsg = ( self.props.lang === "es" ? "Ver en Google Maps" :                  //- Popup map message
                                                "View on Google Maps" );
                                //- Popup place information dialog box
                                const contentString = `
                                <div id="mapContent">
                                    <div id="siteNotice"></div>
                                    <h3 id="firstHeading" class="firstHeading">`+heading+`</h3>
                                    <div id="mapBodyContent">
                                        <p>`+content+`</p>
                                        <p>`+address+`</p>
                                        <p>
                                            <a target="_blank" href="`+mapUrl+`"
                                                <span> `+
                                                mapMsg
                                                +` </span> </a>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                `;

                                self.mapUrl = mapUrl;                                                               //- Set map url
                       
                                document.getElementById( "appOurAddress" ).setAttribute( "href", mapUrl );          //- Set map url
            
                                const infowindow = new google.maps.InfoWindow({                                     //- Set info window
                                    content: contentString,
                                    ariaLabel: "Vysel",
                                });
            
                                const map = new google.maps.Map(                                                    //- Get map
                                    self.googleMapDiv,
                                    defaultMapOptions
                                );
                        
                                map.setCenter(results[0].geometry.location);                                        //- Center map
            
                                const marker = new google.maps.marker.AdvancedMarkerElement({                       //- Get marker with
                                    map: map,                                                                       //- map location and
                                    position: results[0].geometry.location,                                         //- position and
                                    title: self.props.address                                                       //- current address
                                });
            
                                marker.addListener("click", () => {                                                 //- Add marker listener whent it gets clicked
                                    infowindow.open({
                                      anchor: marker,
                                      map,
                                    });
                                });
            
                                //    store them in the state so you can use it later
                                //    E.g. call a function on the map object:
                                //        this.state.map.panTo(...)
                                //    E.g. create a new marker:
                                //        new this.state.google.maps.Marker(...)
                                self.setState({                                                                     //- Set state with google map information
                                    google: google,
                                    map: map,
                                });

                                self.setState({isLoaded: true});                                                    //- Set state isLoaded when component is loaded
                                self.Utl.appLogger("Finishing map loading...");
                            }
                        });
                    });
            
                    self.mounted = true;                                                                            //- This component has been mounted and completed
                }
            }
        });
    }

    render() {                                                                                                      //- Render map component
        this.Utl.appLogger("Now rendering Map...");
        this.Utl.appLogger("state: ", this.state.isLoaded);
        this.Utl.appLogger("this: ", this);
        return (
            <>
            <div className='row mt-4'>
                <div className='col-lg-12 text-center'>
                    <a id="appOurAddress" href="#_" target="_blank">
                        <h3>
                            <FaMapLocationDot className='me-2' />
                            <FormattedMessage
                                id = "app-menu-location"
                                defaultMessage="Our location"
                            />
                            <MdOutlineLaunch className='ms-2' />
                        </h3>
                    </a>
                </div>
            </div>
            <div id="appMap" className='row mt-1 mb-3'>
                <div className='col-lg-12 p-4 app-map'>
                    <div
                        ref={(ref) => { this.googleMapDiv = ref }}
                        style={{ height: '50vh', width: '100%' }}>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default MapSection;