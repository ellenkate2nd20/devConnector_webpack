import React from 'react';
import PropTypes from 'prop-types';

const ProfileCreds = 
({
	profile:
	{
		experience,
		education
	}
}) =>
{
	const expItems = experience.map(exp =>
	(
		<li key={exp.id} className="list-group-item">
			<h4>{exp.company}</h4>

			<p>{exp.from} - {exp.current ? 'Now' : exp.to}</p>

			<p>
				<strong>Position: </strong>
				{exp.title}
			</p>

			<p>
				{exp.location && (
					<span>
						<strong>Location: </strong>
						{exp.location}
					</span>
				)}
			</p>

			<p>
				{exp.description && (
					<span>
						<strong>Description: </strong>
						{exp.description}
					</span>
				)}
			</p>
		</li>
	));

	const eduItems = education.map(edu =>
	(
		<li key={edu.id} className="list-group-item">
			<h4>{edu.school}</h4>

			<p>{edu.from} - {edu.current ? 'Now' : edu.to}</p>

			<p>
				<strong>Degree Of Certification: </strong>
				{edu.degree}
			</p>

			<p>
				<strong>Filed Of Study: </strong>
				{edu.fieldOfStudy}
			</p>

			<p>
				{edu.description && (
					<span>
						<strong>Description: </strong>
						{edu.description}
					</span>
				)}
			</p>
		</li>
	));

	return (
		<div className="row">
			<div className="col-md-6">
				<h3 className="text-center text-info">Experience</h3>

				{expItems.length > 0 
					? ( <ul className="list-group">{expItems}</ul> )
					: ( <p className="text-center">No Experience Listed</p> )
				}
			</div>

			<div className="col-md-6">
				<h3 className="text-center text-info">Education</h3>
				
				{eduItems.length > 0 
					? ( <ul className="list-group">{eduItems}</ul> )
					: ( <p className="text-center">No Education Listed</p> )
				}
			</div>
		</div>
	)
}

// ProfileCreds.propTypes = 
// {
// 	profile: PropTypes.object.isRequired
// };

export default ProfileCreds;