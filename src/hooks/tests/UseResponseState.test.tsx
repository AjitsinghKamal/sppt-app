import { act, renderHook } from '@testing-library/react-hooks';
import useResponseState from '../UseResponseState';

describe('test responseState hook', () => {
	test('should update state with response', () => {
		const { result } = renderHook(() => useResponseState());
		const response = ['success', 'success_with_update'];
		act(() => {
			result.current.dispatch({
				type: 'response',
				payload: response[0],
			});
		});
		expect(result.current.responseState.response).toEqual(response[0]);

		act(() => {
			result.current.dispatch({
				type: 'update',
				payload: {
					response: response[1],
				},
			});
		});
		expect(result.current.responseState.status).toEqual('DONE');
		expect(result.current.responseState.response).toEqual(response[1]);
	});

	test('should update state with error', () => {
		const { result } = renderHook(() => useResponseState());
		const error = ['fail', 'fail_with_update'];
		act(() => {
			result.current.dispatch({
				type: 'error',
				payload: { statusCode: 500, error: error[0] },
			});
		});
		expect(result.current.responseState.error).toEqual({
			statusCode: 500,
			error: error[0],
		});
		act(() => {
			result.current.dispatch({
				type: 'update',
				payload: {
					error: { statusCode: 500, error: error[1] },
				},
			});
		});
		expect(result.current.responseState.status).toEqual('ERROR');
		expect(result.current.responseState.error).toEqual({
			statusCode: 500,
			error: error[1],
		});
	});

	test('should update state with status', () => {
		const { result } = renderHook(() => useResponseState());
		act(() => {
			result.current.dispatch({
				type: 'fetch',
			});
		});
		expect(result.current.responseState.status).toEqual('WAITING');
	});
});
