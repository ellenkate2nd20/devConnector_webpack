import 
{ 
	GET_ERRORS,
	CLEAR_ERRORS
} from './types';

export const getErrors = error =>
{
	return {
		type: GET_ERRORS,
		payload: error.response.data
	}
}

export const clearErrors = () =>
{
	return {
		type: CLEAR_ERRORS
	}
};