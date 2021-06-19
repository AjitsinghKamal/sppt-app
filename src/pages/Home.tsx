import { useCallback, useState } from 'react';

import { PageLayout } from 'src/layouts';
import { useEventList } from 'src/apis/ApiEvents';
import { EventList, EventDatePicker } from 'src/components';
import { css } from '@emotion/css';

function HomePage() {
	const { response, status, error } = useEventList({ dependencies: [] });
	const [selectedDates, setDates] = useState([
		{
			startDate: undefined,
			endDate: undefined,
			key: 'selection',
		},
	]);

	const handleDateSelect = useCallback(({ selection }) => {
		setDates([selection]);
	}, []);

	return (
		<PageLayout>
			<h1 className={page__title}>All Events</h1>
			<div className={filterbar}>
				{response ? (
					<p className={filterbar__meta}>
						Showing<span>{response.items.length}</span>of
						<span>{response.pagination.count}</span>
					</p>
				) : (
					<span>Loading...</span>
				)}
				<EventDatePicker
					onSelect={handleDateSelect}
					selectedDates={selectedDates}
				/>
			</div>
			<EventList
				list={response?.items || []}
				total={response?.pagination.count}
				offset={response?.pagination.offset}
			/>
		</PageLayout>
	);
}

const page__title = css`
	margin-top: 32px;
`;
const filterbar = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const filterbar__meta = css`
	font-weight: 300;
	opacity: 0.8;
	& > span {
		margin: 0 5px;
		font-weight: 400;
	}
`;
export default HomePage;
