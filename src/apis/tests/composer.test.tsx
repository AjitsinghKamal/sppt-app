import { mocked } from 'ts-jest/utils';
import { act, renderHook } from '@testing-library/react-hooks';
import composer from '../composer';
import Http from '../http';

jest.mock('../http');

const mockedHttp = mocked(Http);

const useComposed = composer<string, string>('test');

test('composed api modules updates response data', async () => {
	mockedHttp.mockResolvedValue('success');

	const options = {};
	const { result, waitForNextUpdate } = renderHook(() =>
		useComposed(options)
	);

	act(() => {
		result.current.request({});
	});
	await waitForNextUpdate();
	expect(result.current.response).toEqual('success');
});

test('composed api modules updates response error', async () => {
	mockedHttp.mockRejectedValue('fail');

	const options = {};
	const { result, waitForNextUpdate } = renderHook(() =>
		useComposed(options)
	);

	act(() => {
		result.current.request({});
	});
	await waitForNextUpdate();
	expect(result.current.error).toEqual('fail');
});

test('composed api modules turn off auto update on-demand', async () => {
	mockedHttp.mockResolvedValue('success');
	const noUpdate = true;
	const options = {};
	const { result, waitForNextUpdate } = renderHook(() =>
		useComposed(options)
	);

	act(() => {
		result.current.request({}, noUpdate);
	});
	expect(result.current.response).not.toEqual('success');
});
