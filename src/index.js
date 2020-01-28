import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsconfig from './awsconfig';
import App from 'views/app/App';
import './index.module.scss';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
	Auth: {
		mandatorySignId: true,
		region: awsconfig.cognito.REGION,
		userPoolId: awsconfig.cognito.POOL_ID,
		userPoolWebClientId: awsconfig.cognito.CLIENT_ID,
	},
});

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
