import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'components/button/Button';

const Welcome = () => (
	<>
		<div className='container'>
			<div className='jumbotron bg-warning py-7 text-center'>
				<div as='h1' className='display-4 text-uppercase'>
					Welcome page
				</div>
				<div as='p' className='lead mt-2 font-weight-normal'>
					Check your email inbox and use a sent link to finish your registration proccess.
				</div>
				<Link to='/'>
					<Button className='btn btn-light mt-5 text-warning text-uppercase font-weight-bold'>
						Back to homepage
					</Button>
				</Link>
			</div>
		</div>
	</>
);

export default Welcome;
