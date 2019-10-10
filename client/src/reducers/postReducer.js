import 
{
	GET_POST,
	GET_POSTS,
	POST_LOADING		
} from '../actions/types';

const initialState =
{
	posts: [],
	post: {},
	loading: true
}

export default function(state = initialState, action)
{
	switch(action.type)
	{
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};

		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			}

		default:
			return state;
	}
} 