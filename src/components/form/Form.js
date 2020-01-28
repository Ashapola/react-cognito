import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button/Button';
import FormInput from 'components/form-input/FormInput';
import AppContext from 'context';
import styles from './Form.module.scss';

const Form = ({formInputs, register}) => {
	const [inputData, setInputData] = useState({});

	const setValue = (name, value) => {
		const newInputData = {...inputData};
		newInputData[name] = value;
		setInputData(newInputData);
	};

	const handleChange = e => {
		setValue(e.target.name, e.target.value);
	};

	const checkPasswordEquality = (password, confirmedPassword) => password === confirmedPassword;
	const checkPassword = (password, confirmedPassword) => {
		if (register) {
			return checkPasswordEquality(password, confirmedPassword);
		} else {
			return true;
		}
	};

	return (
		<AppContext.Consumer>
			{context => (
				<div className={`container px-5 pt-${register ? '1' : '3'}`}>
					<div className={styles.wrapper}>
						<form
							onSubmit={
								checkPassword(inputData['password'], inputData['confirm password'])
									? register
										? e => context.handleRegisterSubmit(e, inputData)
										: e => context.handleLoginSubmit(e, inputData)
									: () => alert('Your passwords are not identical')
							}
						>
							{formInputs.map(input => (
								<FormInput
									key={input.name}
									handleChange={handleChange}
									id={input.name}
									type={input.type}
									name={input.name}
									label={input.name}
									value={inputData[input.name] || ''}
									required
								/>
							))}
							<div className={styles.buttons}>
								<Button visual={register ? 'info' : 'success'} type='submit'>
									{register ? 'Sign up' : 'Sign in'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</AppContext.Consumer>
	);
};

Form.propTypes = {
	register: PropTypes.bool,
	formInputs: PropTypes.array.isRequired,
};

Form.defaultProps = {
	register: null,
};

export default Form;
