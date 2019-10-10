import axios from 'axios';

import { getErrors, clearErrors } from './errorActions';

import 
{
	SET_CURRENT_USER, 
	GET_PROFILE,
	CLEAR_CURRENT_PROFILE,
	GET_PROFILES
} from './types';

// get current profile
export const getCurrentProfile = () => async dispatch =>
{
	try
	{
		const res = await axios.get(`/profile`);
		dispatch(
		{
			type: GET_PROFILE,
			payload: res.data
		});
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// get profile by ID
export const getProfileByID = id => async dispatch =>
{
	try
	{
		const res = await axios.get(`/profile/user/${id}`);
		dispatch(
		{
			type: GET_PROFILE,
			payload: res.data
		});
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// get all profiles
export const getProfiles = () => async dispatch =>
{
	try
	{
		const res = await axios.get(`/profile/all`);
		dispatch(
		{
			type: GET_PROFILES,
			payload: res.data
		});
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// create profile
export const createProfile = (profileData, history) => async dispatch =>
{
	try
	{
		await axios.post(`/profile`, profileData);
		// dispatch(showAlert('DONE', 'Update profile successfully'));
		history.push(`/dashboard`);
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// add experience
export const addExperience = (expData, history, exp_id) => async dispatch =>
{
	try
	{
		if(exp_id)
		{
			await axios.post(`/profile/experience?exp_id=${exp_id}`, expData);
		}
		else
		{
			await axios.post(`/profile/experience`, expData);
		}
		// dispatch(showAlert('DONE', 'Add experience successfully'));
		history.push(`/dashboard`);
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// add education
export const addEducation = (eduData, history, edu_id) => async dispatch =>
{
	try
	{
		if(edu_id)
		{
			await axios.post(`/profile/education?edu_id=${edu_id}`, eduData);
		}
		else
		{
			await axios.post(`/profile/education`, eduData);
		}
		// dispatch(showAlert('DONE', 'Add education successfully'));
		history.push(`/dashboard`);
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// delete account and profile
export const deleteAccount = () => async dispatch =>
{
	if(window.confirm('Are you sure? This can NOT be undone!!!'))
	{
		try
		{
			await axios.delete(`/profile`);
			dispatch(
			{
				type: SET_CURRENT_USER,
				payload: {}
			});
			// dispatch(showAlert('DONE', 'Delete account successfully'));
			dispatch(clearErrors());
		}
		catch(err)
		{
			dispatch(getErrors(err));
		}
	}
};

// delete experience
export const deleteExperience = (id) => async dispatch =>
{
	if(window.confirm('Are you sure? This can NOT be undone!!!'))
	{
		try
		{
			await axios.delete(`/profile/experience/${id}`);
			dispatch(getCurrentProfile());
			// dispatch(showAlert('DONE', 'Delete experience successfully'));
			dispatch(clearErrors());
		}
		catch(err)
		{
			dispatch(getErrors(err));
		}
	}
};

// delete education
export const deleteEducation = (id) => async dispatch =>
{
	if(window.confirm('Are you sure? This can NOT be undone!!!'))
	{
		try
		{
			await axios.delete(`/profile/education/${id}`);
			dispatch(getCurrentProfile());
			// dispatch(showAlert('DONE', 'Delete education successfully'));
			dispatch(clearErrors());
		}
		catch(err)
		{
			dispatch(getErrors(err));
		}
	}
};

// add follow
export const addFollow = user_id => async dispatch =>
{
	try
	{
		await axios.post(`profile/follow/${user_id}`);

		dispatch(getCurrentProfile());
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// remove follow
export const removeFollow = user_id => async dispatch =>
{
	try
	{
		await axios.post(`profile/unfollow/${user_id}`);

		dispatch(getCurrentProfile());
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// clear loading
export const clearCurrentProfile = () =>
{
	return {
		type: CLEAR_CURRENT_PROFILE
	}
};