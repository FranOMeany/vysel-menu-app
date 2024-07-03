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


