import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { deleteEducation } from '../../actions/profileActions';

const Education = 
({
	deleteEducation,
	education
}) =>
{
	const educations = education.map(edu =>
	(
		<tr key={edu.id}>
			<td>{edu.school}</td>
			<td>{edu.degree}</td>
			<td>{edu.fieldOfStudy}</td>
			<td>{edu.from} - {edu.current ? 'Now' : edu.to}</td>
			<td>
				<Link to={`/edit-education/${edu.id}`} className="btn btn-info">
					Edit
				</Link>
			</td>
			<td>
				<button
					onClick={() => deleteEducation(edu.id)}
					className="btn btn-danger">
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h4 className="mb-4">Education Credentials</h4>
			
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th>Degree Of Certification</th>
						<th>Field Of Study</th>
						<th>Years</th>
						<th></th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{ educations }
				</tbody>
			</table>
		</Fragment>
	)
}

Education.propTypes = 
{
	deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = 
{
	deleteEducation
}

export default connect(null, mapDispatchToProps)(Education);