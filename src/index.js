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

const messages = {																									//- Language messages in
	'en': English,																									//- English and
	'es': Spanish																									//- Spanish
};

var utl = new Utility();																							//- Get an instance of our Utility class
console.log("Utility: ", utl);																						//- Show object to set debug on/off
let language = utl.getCookie("appLang");																			//- Get current language

if( language === undefined || language === '' ) {																	//- If current language is undefined then
	language = 'en';																								//- Language should be English
  utl.setCookie( "appLang", language, 30 );																			//- Set cookie with new current language
}

let acct = utl.getAccount();																						//- Get account # passed on url ( i.e. ?acct=000000000000)
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

utl.appLogger("Account: ", acct );																					//- Show account number being passed

const data = {																										//- Data to retreive account information
  "method": 10,																										//- Method
  "account": acct																									//- Account number
}

let server = ( window.location.host === "localhost:3000" ? "./public/api/menuAgent.php" : "/api/menuAgent.php" );	//- Get server location depending on Dev/Production
axios.post( server, data, {																							//- Post data to server
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
})
.then(function (response) {																							//- Get response
	utl.appLogger( "axios response: ", response);																	//- Log response
	if( response.status === 200 ) {																					//- If response is OK
		localStorage.setItem( 'profile', JSON.stringify( response.data ) );											//- Store response data in local storage
	}
})																													//- Otherwise
.catch(function (error) {																							//- Get error
	utl.appLogger( "axios error: ", error);																			//- Log error
});

const root = ReactDOM.createRoot(document.getElementById('root'));													//- Get root and 
root.render(																										//- Render App and wrap IntlProvider for translations
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
