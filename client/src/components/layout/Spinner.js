import React, { Fragment } from 'react';
import loading from '../../img/loading.gif';

const Spinner = () => 
{
	return (
		<Fragment>
			<img 
				src={loading}
				style={{ width: '150px', margin: 'auto', display: 'block' }} 
				alt="Loading..."/>
		</Fragment>
	)
}

export default Spinner;