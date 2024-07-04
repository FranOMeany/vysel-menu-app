/**
 *   Name: index.js
 * Author: Francisco J. O'Meany
 * Description: Index module for menu applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {IntlProvider} from "react-intl";
import axios from 'axios';
import Utility from './Components/Utility/Utility';
import Spanish from './Lang/es_ES.json';
import English from './Lang/en_US.json';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const messages = {
	'en': English,
	'es': Spanish
};

var utility = new Utility();
console.log("Utility: ", utility);
let utl = new Utility();
let lng = utl.getCookie("appLang");

if( lng === undefined || lng === '' ) {
  lng = 'en';
  utl.setCookie( "appLang", lng, 30 );
}

const language = lng;

let acct = utl.getAccount();
if( acct === null ) {
  //- Redirect to main application (i.e. https://vysel.com)
}

/*	//- For future Google Maps implementation with ImportLibrary instead of Loader ( see Map component )
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: process.env.REACT_APP_GOOGLE_MAP_API,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
});

*/

utl.appLogger("Account: ", acct );


const data = {
  "method": 10,
  "account": acct
}

let server = ( window.location.host === "localhost:3000" ? "./src/api/menuAgent.php" : "/api/menuAgent.php" );
axios.post( server, data, {
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
})
.then(function (response) {
	utl.appLogger( "axios response: ", response);
	if( response.status === 200 ) {
		localStorage.setItem( 'profile', JSON.stringify( response.data ) );
	}
})
.catch(function (error) {
	utl.appLogger( "axios error: ", error);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<IntlProvider locale={language} defaultLocale={language} messages={messages[language]}>
    	<App />
	</IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
