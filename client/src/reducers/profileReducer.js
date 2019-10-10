import 
{ 
	GET_PROFILE, 
	CLEAR_CURRENT_PROFILE,
	GET_PROFILES
} from '../actions/types';

const initialState =
{
	profile: {},
	profiles: [],
	loading: true
}

export default function(state = initialState, action)
{
	switch(action.type)
	{
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false
			}
		
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: {},
				loading: false
			}

		case GET_PROFILES:
			return {
				...state,
				profiles: action.payload,
				loading: false
			}

		default:
			return state;
	}
} 