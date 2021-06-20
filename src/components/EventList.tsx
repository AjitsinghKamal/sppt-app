import List from './List';
import EventItem from './EventItem';
import { EventListResponse } from 'src/apis/ApiEvents';
import { css } from '@emotion/css';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
	loading: boolean;
	pagination?: EventListResponse['pagination'];
	list?: EventListResponse['items'];
	onNext?: () => void;
};

function EventList({ list = [], pagination, loading, onNext }: Props) {
	const history = useHistory();

	/**
	 * tells List component to show or hide the `load more` btn
	 */
	const hasMore = useMemo(() => {
		return (
			pagination &&
			pagination.offset + pagination.limit < pagination.count
		);
	}, [pagination]);

	/**
	 * allows clicking on list-item to redirect to details
	 * @param id event id
	 */
	const showDetails = (id: number) => {
		history.push(`/${id}`);
	};

	return (
		<List
			showLoader={loading}
			showNotFound={!pagination?.count}
			onLoadMore={onNext}
			hasMore={hasMore}
		>
			{list.map((event) => (
				<li
					key={event.id}
					className={item}
					onClick={() => showDetails(event.id)}
				>
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
	cursor: pointer;
`;
export default EventList;
