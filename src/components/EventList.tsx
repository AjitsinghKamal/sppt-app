import List from './List';
import EventItem from './EventItem';
import { EventListResponse } from 'src/apis/ApiEvents';
import { css } from '@emotion/css';
import { useMemo } from 'react';

type Props = {
	loading: boolean;
	pagination?: EventListResponse['pagination'];
	list?: EventListResponse['items'];
	onNext?: () => void;
};

function EventList({ list = [], pagination, loading, onNext }: Props) {
	const hasMore = useMemo(() => {
		return (
			pagination &&
			pagination.offset + pagination.limit < pagination.count
		);
	}, [pagination]);
	return (
		<List
			showLoader={loading}
			showNotFound={!pagination?.count}
			onLoadMore={onNext}
			hasMore={hasMore}
		>
			{list.map((event) => (
				<li key={event.id} className={item}>
					<EventItem
						title={event.position.name}
						start={event.startsAt}
						end={event.endsAt}
						color={event.position.color}
					/>
				</li>
			))}
		</List>
	);
}

const item = css`
	margin: 24px 0;
`;
export default EventList;
