import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import axios from 'axios';
import Navbar from 'components/navbar/Navbar';
import Homepage from 'views/homepage/Homepage';
import Welcome from 'views/welcome/Welcome';
import Task from 'views/task/Task';
import Modal from 'components/modal/Modal';
import {formInputRegister, formInputLogin} from 'components/form-input/formInputData';
import AppContext from 'context';
import awsconfig from 'awsconfig';

const App = () => {
	const [isModalRegisterOpen, setModalRegisterStatus] = useState(false);
	const [isModalLoginOpen, setModalLoginStatus] = useState(false);
	const [isAuthenticated, setAuthenticationState] = useState(false);
	const [user, setUserState] = useState(null);

	const setAuth = authenticated => setAuthenticationState(authenticated);
	const setUser = userObj => setUserState(userObj);
	let history = useHistory();

	useEffect(() => {
		async function checkStatus() {
			try {
				// const session = await Auth.currentSession();
				await Auth.currentSession();
				setAuth(true);
				// console.log(session);
				const user = await Auth.currentAuthenticatedUser();
				setUser(user);
			} catch (error) {
				error !== 'No current user' && console.log(`Error message: ${error}`);
			}
		}
		checkStatus();
	}, []);

	const handleOpenModal = modalName => {
		if (modalName === 'register') {
			setModalRegisterStatus(true);
		} else if (modalName === 'login') {
			setModalLoginStatus(true);
		}
	};

	const handleCloseModal = () => {
		setModalRegisterStatus(false);
		setModalLoginStatus(false);
	};

	const modal = isModalRegisterOpen ? (
		<Modal
			classes='text-info text-center lead text-bold font-weight-bolder pt-4'
			closeModal={handleCloseModal}
			formInputs={formInputRegister}
			register
		>
			Create a new account
		</Modal>
	) : isModalLoginOpen ? (
		<Modal
			classes='text-success text-center lead text-bold font-weight-bolder pt-4'
			closeModal={handleCloseModal}
			formInputs={formInputLogin}
		>
			Log in to your account
		</Modal>
	) : (
		''
	);

	const handleRegisterSubmit = async (e, userData) => {
		e.preventDefault();
		const {name, email, password} = userData;
		// console.log(userData);
		try {
			const awsResponse = await Auth.signUp({
				username: name,
				password: password,
				attributes: {
					email: email,
				},
			});
			console.log(awsResponse);
		} catch (error) {
			console.log(`Message error: ${error}`);
		}
		handleCloseModal();
		history.push('/welcome');
	};

	const handleLoginSubmit = async (e, userData) => {
		e.preventDefault();
		const {name, password} = userData;
		// console.log(userData);
		try {
			const awsUserObject = await Auth.signIn({
				username: name,
				password: password,
			});
			// console.log(awsUserObject);
			setAuth(true);
			setUser(awsUserObject);
			// console.log(user);
			handleCloseModal();
			history.push('/');
		} catch (error) {
			console.log(`Message error: ${error}`);
		}
	};

	const handleRequest = () => {
		console.log('U SENT A REQUEST');
		const storageName = window.localStorage.getItem(
			`CognitoIdentityServiceProvider.${awsconfig.cognito.CLIENT_ID}.LastAuthUser`,
		);
		const storageToken = window.localStorage.getItem(
			`CognitoIdentityServiceProvider.${awsconfig.cognito.CLIENT_ID}.${storageName}.idToken`,
		);
		// console.log('TOKEN: ' + storageToken);
		// console.log('USER NAME: ' + storageName);
		fetchData(storageToken);
		history.push('/task');
	};

	const fetchData = async jwtToken => {
		try {
			const response = await axios.get(awsconfig.api.AWS_URL, {
				headers: {Authorization: `Bearer ${jwtToken}`},
			});
			console.log(response);
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const contextData = {
		handleRegisterSubmit,
		handleLoginSubmit,
		handleRequest,
	};

	const authorizationProps = {
		isAuthenticated: isAuthenticated,
		user: user,
		setAuth: setAuth,
		setUser: setUser,
	};

	return (
		<AppContext.Provider value={contextData}>
			<Navbar openModal={handleOpenModal} authProps={authorizationProps} />
			<Switch>
				<Route exact path='/' render={() => <Homepage />} />
				<Route path='/welcome' render={() => <Welcome />} />
				<Route path='/task' render={() => <Task />} />
			</Switch>
			{modal}
		</AppContext.Provider>
	);
};

export default App;
