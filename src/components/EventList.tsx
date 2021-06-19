import List, { Props as ListProps } from './List';
import EventItem from './EventItem';

import { EventListResponse } from 'src/apis/ApiEvents';
import { css } from '@emotion/css';

type Props = {
	list: EventListResponse['items'];
} & ListProps;

function EventList({ list, ...listProps }: Props) {
	return (
		<List {...listProps}>
			{list.map((event) => (
				<li key={event.id} className={__item}>
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

const __item = css`
	margin: 24px 0;
`;
export default EventList;
