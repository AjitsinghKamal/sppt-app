import { mocked } from 'ts-jest/utils';

import EventsPage from '../Events';
import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { useEventList } from 'src/apis/ApiEvents';

jest.mock('../../apis/ApiEvents');

const mockedUseEventList = mocked(useEventList);

describe('event list page', () => {
	beforeEach(() => {
		mockedUseEventList.mockReturnValue({
			response: {
				items: [
					{
						id: 1,
						startsAt: '0',
						endsAt: '1',
						position: {
							name: 'test',
							color: 'test',
							id: 0,
						},
					},
				],
				pagination: {
					count: 1,
					limit: 0,
					offset: 10,
				},
			},
			request: jest.fn(),
			status: 'DONE',
			error: undefined,
			dispatch: jest.fn(),
		});
	});
	test('should render list of events', async () => {
		await act(async () => {
			const { getAllByRole } = render(<EventsPage />);
			const items = getAllByRole('listitem');
			expect(items.length).toEqual(1);
		});
	});
});
