import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({children, visual, close, name, ...props}) => {
	const buttonClass = close ? styles.buttonClose : `btn btn-${visual} ml-1`;

	return (
		<button className={buttonClass} name={name} {...props}>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	visual: PropTypes.string,
	close: PropTypes.bool,
	name: PropTypes.string,
	props: PropTypes.element,
};

Button.defaultProps = {
	close: null,
	visual: null,
	name: null,
	props: null,
};

export default Button;
