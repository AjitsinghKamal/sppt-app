import List from './List';
import EventItem from './EventItem';
import { EventListResponse } from 'src/apis/ApiEvents';
import { css } from '@emotion/css';

type Props = {
	loading: boolean;
	pagination?: EventListResponse['pagination'];
	list?: EventListResponse['items'];
};

function EventList({ list = [], pagination, loading }: Props) {
	return (
		<List
			showLoader={loading}
			showNextLoader={!!pagination?.count && loading}
			showNotFound={!pagination?.count}
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
