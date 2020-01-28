import React from 'react';
import {Link} from 'react-router-dom';
import ApppContext from 'context';
import Button from 'components/button/Button';

const Task = () => (
	<ApppContext.Consumer>
		{context => (
			<div className='container'>
				<div className='jumbotron bg-info py-7 text-center'>
					<div as='h1' className='display-4 text-uppercase'>
						Task page
					</div>
					<div as='p' className='lead mt-2 text-white'>
						Click a button on the right to process a recrutation task
					</div>
					<Link to='/'>
						<Button className='btn btn-light mt-5 text-info text-uppercase font-weight-bold mr-2'>
							Back to homepage
						</Button>
					</Link>
					<Button
						className='btn btn-secondary mt-5 text-light text-uppercase font-weight-bold ml-2'
						onClick={context.handleRequest}
					>
						Send a request
					</Button>
				</div>
			</div>
		)}
	</ApppContext.Consumer>
);

export default Task;
