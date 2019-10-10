import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { getErrors, clearErrors } from './errorActions';

import 
{ 
	SET_CURRENT_USER 
} from './types';

// get current user
export const getCurrentUser = () => async dispatch =>
{
	try
	{
		const res = await axios.get(`/users/current`);
		dispatch(setCurrentUser(res.data));
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
}

// register user
export const registerUser = (userData, history) => async dispatch =>
{
	try
	{
		await axios.post(`/users/register`, userData);
		history.push('/login');
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// login user - get user token
export const loginUser = userData => async dispatch =>
{
	try
	{
		const res = await axios.post(`/users/login`, userData);
		const { token } = res.data;

		localStorage.setItem('jwtToken', token);
		setAuthToken(token);

		dispatch(setCurrentUser(jwt_decode(token))) ;
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// set logged id user
export const setCurrentUser = decoded =>
{
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
};

// log user out
export const logoutUser = () => dispatch =>
{
	// remove token
	localStorage.removeItem('jwtToken');
	localStorage.removeItem('currentPostPage');
	localStorage.removeItem('currentProfilePage');

	// remove auth header for fuure requests
	setAuthToken(false);

	// empty current user which set isAuthenticated to false
	dispatch(setCurrentUser({}));

	// clear errors
	dispatch(clearErrors());
};