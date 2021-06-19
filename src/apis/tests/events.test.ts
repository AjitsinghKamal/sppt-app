import { mocked } from 'ts-jest/utils';
import Http from '../http';
import { getEventList, getEventDetails } from '../events';

jest.mock('../http');

const mockedHttp = mocked(Http);

describe('events api module', () => {
	test('should resolve with expected events list', async () => {
		const resolved = 'success';
		mockedHttp.mockResolvedValue(resolved);
		await expect(getEventList()).resolves.toEqual(resolved);
	});

	test('should reject with expected error message for events list', async () => {
		const reject = 'request failed';
		mockedHttp.mockRejectedValue(reject);
		try {
			await getEventList();
		} catch (e) {
			expect(e).toEqual(reject);
		}
	});

	test('should resolve with expected event detail', async () => {
		const resolved = {
			data: 'success',
		};
		mockedHttp.mockResolvedValue(resolved);
		await expect(getEventDetails()).resolves.toEqual(resolved);
	});

	test('should reject with expected error message for events detail', async () => {
		const reject = 'request failed';
		mockedHttp.mockRejectedValue(reject);
		try {
			await getEventDetails();
		} catch (e) {
			expect(e).toEqual(reject);
		}
	});
});
