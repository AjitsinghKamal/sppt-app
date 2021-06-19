import { PageLayout } from 'src/layouts';
import { useEventList } from 'src/apis/ApiEvents';

function HomePage() {
	const { response, status, error } = useEventList();
	console.log(response);
	return (
		<PageLayout>
			<div>
				<ul>
					{response &&
						response.items.map((item) => {
							return <p key={item.id}>{item.position.name}</p>;
						})}
				</ul>
			</div>
		</PageLayout>
	);
}

export default HomePage;
