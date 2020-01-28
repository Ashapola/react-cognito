import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button/Button';
import Form from 'components/form/Form';
import styles from './Modal.module.scss';

const Modal = ({classes, children, closeModal, formInputs, register}) => (
	<div className={styles.wrapper}>
		<div className={register ? styles.modal : styles.login}>
			<div className={styles.button}>
				<Button close onClick={closeModal}>
					✖
				</Button>
			</div>
			<div className={classes}>{children}</div>
			<Form formInputs={formInputs} register={!!register} />
		</div>
	</div>
);

Modal.propTypes = {
	classes: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
	formInputs: PropTypes.array.isRequired,
	register: PropTypes.bool,
};

Modal.defaultProps = {
	register: null,
};

export default Modal;
