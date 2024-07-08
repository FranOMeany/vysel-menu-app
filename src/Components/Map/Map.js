/**
 *   Name: Map.js
 * Author: Francisco J. O'Meany
 * Description: Map class component for all applications developed by Netequal Technology Solutions & Vysel
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
        this.param      = props;
        this.Utl        = new Utility();                                                                            //- Get an instance of our Utility class
        this.mounted	= false;																					//- In React version 18, a change was made to strict mode so 
        this.state      = {};                                                                                       //- that components will mount, then unmount, then mount again. 
    }

    componentDidMount() {        
        const self = this;                                                                                          //- Set self as our class for future reference
        const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;                                                        //- Get our API Key

        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
                if( !self.mounted ) {
                    const language = self.props.lang;
                    self.Utl.appLogger('React app DOM fully loaded on Map component. Lang is: ', language);	        //- Log mounted event and show current language

                    const loader = new Loader({                                                                     //- Set loader parameters
                        apiKey: apiKey,
                        version: "weekly",
                        libraries: ["places"],
                        language: language.toUpperCase()                                                            //- Google recognizes the location in UPPER CASE ONLY
                    });
                    
                    const defaultMapOptions = {
                        zoom: self.props.zoom,
                        mapId: 'VYSEL_MAP_ID'                                                                       //- Required for AdvancedMarkerElement
                    };

                    loader.load().then((google) => {
                        google.maps.importLibrary("marker");
                        const geocoder = new google.maps.Geocoder();
                        geocoder.geocode( { 'address': self.props.address}, function(results, status) {
                            const heading = self.props.heading;
                            const content = self.props.content;
                            const address = self.props.address;
            
                            if (status === 'OK') {
                                self.addr = results[0];
                                const addr = results[0];
                                const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + 
                                                addr.geometry.location.lat() + "%2C" + 
                                                addr.geometry.location.lng() + "&query_place_id=" + 
                                                addr.place_id + "&hl=" + self.props.lang.toUpperCase();
            
                                const mapMsg = ( self.props.lang === "es" ? "Ver en Google Maps" : "View on Google Maps" );
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
                       
                                document.getElementById( "appOurAddress" ).setAttribute( "href", mapUrl );
            
                                const infowindow = new google.maps.InfoWindow({
                                    content: contentString,
                                    ariaLabel: "Vysel",
                                });
            
                                const map = new google.maps.Map(
                                    self.googleMapDiv,
                                    defaultMapOptions
                                );
                        
                                map.setCenter(results[0].geometry.location);
            
                                const marker = new google.maps.marker.AdvancedMarkerElement({
                                    map: map,
                                    position: results[0].geometry.location,
                                    title: self.props.address
                                });
            
                                marker.addListener("click", () => {
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
                                self.setState({
                                    google: google,
                                    map: map
                                });
                            }
                        });
                    });
            
                    self.mounted = true;
                }
            }
        });
    }

    render() {
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
        )
    }
}

export default MapSection;