import { PageLayout } from 'src/layouts';
import { useEventList } from 'src/apis/ApiEvents';
import { EventList } from 'src/components';

function HomePage() {
	const { response, status, error } = useEventList({ dependencies: [] });
	return (
		<PageLayout>
			<EventList
				list={response?.items || []}
				total={response?.pagination.count}
				offset={response?.pagination.offset}
			/>
		</PageLayout>
	);
}

export default HomePage;
