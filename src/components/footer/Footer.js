import React from 'react';
import cx from 'classnames';
import styles from './Footer.module.scss';

const Footer = () => (
	<div className={cx('bg-warning', styles.wrapper)}>
		<div className='container'>
			<div className={styles.textbox}>
				<div as='h3' className='lead text-dark'>
					Mariusz Aleksandrowicz
				</div>
				<p className='text-dark'>mariusz.aleksandrowicz@outlook.com</p>
			</div>
		</div>
	</div>
);

export default Footer;
