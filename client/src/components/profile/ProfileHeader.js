import React from 'react';
import PropTypes from 'prop-types';

const ProfileHeader = 
({
	profile:
	{
		user: { name, avatar },
		status,
		company,
		location,
		website,
		social
	}
}) =>
{
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card card-body bg-info text-white mb-3">
					<div className="row">
						<div className="col-4 col-md-3 m-auto">
							<img src={avatar} alt="" className="rounded-circle" />
						</div>
					</div>

					<div className="text-center">
						<h1 className="display-4 text-center">
							{name}
						</h1>

						<p className="lead text-center">
							{status}
							{company && (<span> at {company}</span>)}
						</p>

						{location && (<p>{location}</p>)}

						<p>
							{website && (
								<a 
									href={website} 
									target="_blank"
									rel="noopener noreferrer"
									className="text-white p-2">
									<i className="fas fa-globe fa-2x" />
								</a>
							)}

							{social.twitter && (
								<a 
									href={social.twitter} 
									target="_blank"
									rel="noopener noreferrer"
									className="text-white p-2">
									<i className="fab fa-twitter fa-2x" />
								</a>
							)}

							{social.facebook && (
								<a 
									href={social.facebook} 
									target="_blank"
									rel="noopener noreferrer"
									className="text-white p-2">
									<i className="fab fa-facebook fa-2x" />
								</a>
							)}

							{social.linkedin && (
								<a 
									href={social.linkedin} 
									target="_blank"
									rel="noopener noreferrer"
									className="text-white p-2">
									<i className="fab fa-linkedin fa-2x" />
								</a>
							)}

							{social.youtube && (
								<a 
									href={social.youtube} 
									target="_blank"
									rel="noopener noreferrer" 
									className="text-white p-2">
									<i className="fab fa-youtube fa-2x" />
								</a>
							)}

							{social.instagram && (
								<a 
									href={social.instagram} 
									target="_blank"
									rel="noopener noreferrer" 
									className="text-white p-2">
									<i className="fab fa-instagram fa-2x" />
								</a>
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

// ProfileHeader.propTypes = 
// {
// 	profile: PropTypes.object.isRequired
// };

export default ProfileHeader;