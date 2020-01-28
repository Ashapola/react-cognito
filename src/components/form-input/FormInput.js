import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './FormInput.module.scss';

const FormInput = ({handleChange, label, value, ...props}) => (
	<div className={styles.wrapper}>
		<input className={styles.formInput} onChange={handleChange} {...props} />
		{label && (
			<label
				className={cx(value.length && styles.shrink, styles.formInputLabel)}
				htmlFor={value.length && props.id}
			>
				{label}
			</label>
		)}
	</div>
);

FormInput.propTypes = {
	handleChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default FormInput;
