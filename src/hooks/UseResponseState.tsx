import { useReducer, useMemo } from 'react';
import { HttpError } from 'src/apis/http';

//#region typedef
type RequestState = 'DONE' | 'WAITING' | 'ERROR' | null;

type HttpRequestState<ResponseType> = {
	response?: ResponseType;
	status: RequestState;
	error?: HttpError | HttpError[];
};

type Action<ResponseType> =
	| {
			type: 'status';
			payload: RequestState;
	  }
	| {
			type: 'update';
			payload: {
				response?: ResponseType;
				status?: RequestState;
				error?: HttpRequestState<ResponseType>['error'];
			};
	  }
	| {
			type: 'error';
			payload: HttpRequestState<ResponseType>['error'];
	  }
	| {
			type: 'response';
			payload: any;
	  }
	| {
			type: 'fetch' | 'reset';
	  };

//#endregion typedef

type ReducerType<T> = (
	state: HttpRequestState<T>,
	action: Action<T>
) => HttpRequestState<T>;

const Reducer: <K>() => ReducerType<K> = () => (state, action) => {
	switch (action.type) {
		case 'status':
		case 'response':
		case 'error':
			return { ...state, [action.type]: action.payload };
		case 'update': {
			const _state = { ...state, ...action.payload };
			if (action.payload.response) _state.status = 'DONE';
			if (action.payload.error) _state.status = 'ERROR';
			return _state;
		}
		case 'fetch':
			return { ...state, status: 'WAITING' };
		case 'reset':
			return { ...initialState };
		default:
			return state;
	}
};

const initialState = {
	response: undefined,
	error: undefined,
	status: null,
};
/**
 * A specialized hook for managing fetch responses in component state
 *
 * @returns
 * {
 *  response
 *  status
 *  error
 * }
 *
 * [response] Response from a successful fetch request.
 *
 * [status] Identifier for tracking the current state of fetch request
 * can be
 * - 'WAITING', for request in progress. Useful for showing loading indicators.
 * - 'DONE', for request successful and response recieved.
 * - 'ERROR', request failed.
 * - null, request not initialised yet.
 *
 * [error] Returns an object with {statusCode, response}
 *
 * @returns dispatch - state modifier
 *
 */
function useResponseState<ResponseType>() {
	const [responseState, dispatch] = useReducer<ReducerType<ResponseType>>(
		Reducer(),
		initialState
	);

	const state = useMemo(
		() => ({
			dispatch,
			responseState,
		}),
		[JSON.stringify(responseState)]
	);

	return state;
}

export default useResponseState;
