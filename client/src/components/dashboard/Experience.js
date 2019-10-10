import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { deleteExperience } from '../../actions/profileActions';

const Experience = 
({
	experience,
	deleteExperience
}) =>
{
	const experiences = experience.map(exp =>
	(
		<tr key={exp.id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>{exp.from} - {exp.current ? 'Now' : exp.to}</td>
			<td>
				<Link to={`/edit-experience/${exp.id}`} className="btn btn-info">
					Edit
				</Link>
			</td>
			<td>
				<button 
					onClick={() => deleteExperience(exp.id)} 
					className="btn btn-danger">
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h4 className="mb-4">Experience Credentials</h4>
			
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th></th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{experiences}
				</tbody>
			</table>
		</Fragment>
	)
}

Experience.propTypes = 
{
	deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps =
{
	deleteExperience
}

export default connect(null, mapDispatchToProps)(Experience);