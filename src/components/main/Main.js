import React from 'react';
import cx from 'classnames';
import styles from './Main.module.scss';

const Main = () => (
	<div className={cx('jumbotron jumbotron-fluid', styles.wrapper)}>
		<div className={styles.textbox}>
			<div as='h1' className='display-3 text-warning'>
				Zadanie rekrutacyjne
			</div>
			<h3 className='text-primary'>React oraz AWS Cognito</h3>
		</div>
	</div>
);

export default Main;
