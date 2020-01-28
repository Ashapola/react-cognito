import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Button from 'components/button/Button';
import logo from 'assets/images/logo.png';
import styles from './Navbar.module.scss';

const Navbar = ({openModal, authProps}) => {
	const handleOpenModal = e => {
		openModal(e.target.name);
	};

	const handleLogout = async event => {
		event.preventDefault();
		try {
			Auth.signOut();
			authProps.setAuth(false);
			authProps.setUser(null);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container'>
				<Link to='/' className='navbar-brand mr-auto'>
					<img className={styles.logo} src={logo} alt='Ashapola logo' />
				</Link>
				{!authProps.isAuthenticated ? (
					<>
						<Button name='register' onClick={handleOpenModal} visual='warning'>
							Sign up
						</Button>
						<Button name='login' onClick={handleOpenModal} visual='dark'>
							Sign in
						</Button>
					</>
				) : (
					<>
						<Link to='/task'>
							<Button visual='secondary'>Send a request</Button>
						</Link>
						<Button name='logout' onClick={handleLogout} visual='danger'>
							Sign out
						</Button>
					</>
				)}
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	openModal: PropTypes.func.isRequired,
	authProps: PropTypes.object.isRequired,
};

export default Navbar;
