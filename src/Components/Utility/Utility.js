/**
 *   Name: Utility.js
 * Author: Francisco J. O'Meany
 * Description: Utility class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React, { useEffect } from 'react';

class Utility extends React.Component {
    constructor(props) {
        super(props);

        const select = (el, all = false) => {
            el = el.trim()
            if (all) {
                return [...document.querySelectorAll(el)]
            } else {
                return document.querySelector(el)
            }
        }

        const on = (type, el, listener, all = false) => {
            let selectEl = select(el, all)
            if (selectEl) {
                if (all) {
                    //- Select each element and set a listener for each event
                    selectEl.forEach(e => 
                        type.forEach( event => 
                            e.addEventListener(event, listener)
                        )
                    );
                } else {
                    selectEl.addEventListener(type, listener)
                }
            }
        }

        this.select     = select;
        this.on         = on;
        this.logObj     = ( typeof console !== "undefined" ? console : window.console );
        this.logSwitch  = this.getCookie('AppDebugger');
        this.logSwitch  = this.logSwitch === undefined ? "off" : this.logSwitch;
        this.logStatus  = ( this.logSwitch.toLowerCase() === "on" ? "enabled" : "disabled" );
        this.appLogger();
    }
    initialize = () => {
        useEffect(()=>{
            this.appLogger('We are in useEffect function');
        
            let links = document.querySelectorAll('a[href*="#"]');    //- Hide hash + ref
            links.forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(function() {
                        window.history.pushState(document.html, document.title, document.URL.split('#')[0]);
                    }, 1);
                });
            });
        },[]);
    }
    //-----------------------------------------------------------//
    //-- getCookie()
    //-----------------------------------------------------------//
    getCookie( c_name ) {
        let i,x,y,ARRcookies=document.cookie.split(";");
        
        for (i=0;i<ARRcookies.length;i++)
        {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x === c_name) {
            return decodeURI(y);
        }
        }
        return;
    }
    //-----------------------------------------------------------//
    //-- setCookie()
    //-----------------------------------------------------------//
    setCookie( c_name, value, exdays ) {
        let exdate = new Date();
        let domain = ( document.location.host.indexOf("localhost") === -1 ? document.location.host : "localhost" );
        let c_value = "";
        
        if( exdays === -1 ) {
            exdate.setHours( +12 );
        } else {
            exdate.setDate(exdate.getDate() + exdays);
        }
        
        if( domain === "" ) {
            c_value = encodeURIComponent(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
        } else {
            c_value = encodeURIComponent(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/; SameSite=None; domain=" + domain + "; Secure";
        }
        
        document.cookie = c_name + "=" + c_value;
        return;
    }
    //-----------------------------------------------------------//
	//-- setDebug()
	//-----------------------------------------------------------//
	setDebug( state ) {
        this.setCookie( "AppDebugger", state, 1 );
        document.location.reload();
        return( true );
    }
    //-----------------------------------------------------------//
	//-- appLogger()
	//-----------------------------------------------------------//
	appLogger( logStr = null, value = null ) {
		// logging facility
        if( logStr === null ) {
            this.logObj.log( "Log Facility is " + this.logStatus );
        }

        if( this.logStatus === "enabled" && logStr !== null ) {
            this.logObj.log( logStr, value );
        }

		return( true );
	}
    //-----------------------------------------------------------//
	//-- getAccount()
	//-----------------------------------------------------------//
    getAccount() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        url.href = url.href.toLowerCase();
        const acct = url.searchParams.get("acct");

        return( acct );
    }

    render() {
        return(<div></div>);
    }
}

export default Utility;