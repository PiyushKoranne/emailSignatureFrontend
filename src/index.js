import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { ErrorBoundary } from "react-error-boundary";
import FallBack from './components/FallBack';
import disableReactDevTools from './services/disableReactDevTools';

// disable react dev tools on production
if(process.env.NODE_ENV === 'production'){
	disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='1060378012949-ptebsjdm2m1ilvv06dqhg9piuss9ucvo.apps.googleusercontent.com'>
        <Router>
			<ErrorBoundary FallbackComponent={FallBack}>
				<ScrollToTop/>
	            <App/>
			</ErrorBoundary>
        </Router>
    </GoogleOAuthProvider>
);
