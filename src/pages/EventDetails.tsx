import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import { useEventDetails } from 'src/apis/ApiEvents';
import { Avatar, TimeSlot, BackNav } from 'src/components';
import { PageLayout } from 'src/layouts';
import { ReactComponent as Spinner } from 'src/assets/spinner.svg';

function EventDetailsPage() {
	const { eventId } = useParams<{ eventId: string }>();
	const { response, status, error } = useEventDetails({
		dependencies: [],
		path: `/${eventId}`,
	});
	const employees = (response && response.employees) || [];

	return (
		<PageLayout>
			{error ? (
				<div className={notfound}>
					<h2>Event not found :(</h2>
					<BackNav />
				</div>
			) : status === 'WAITING' ? (
				<Spinner width={48} className={loader} />
			) : (
				<>
					<header className={head}>
						<BackNav wrapperClass={nav} />
						<h1>Details</h1>
						<h3>{response && response.position?.name}</h3>
						<div className={schedule}>
							<TimeSlot type="start" time={response?.startsAt} />
							<TimeSlot type="end" time={response?.endsAt} />
						</div>
					</header>
					<section className={list__container}>
						<h4>Employees</h4>
						<ul className={list}>
							{employees.length
								? employees.map((employee) => (
										<li key={employee.id} className={card}>
											<Avatar
												src={employee.image}
												name={employee.firstName}
											/>
											<p className={name}>
												<span>
													{employee.firstName}
												</span>
												<strong>
													{employee.lastName}
												</strong>
											</p>
										</li>
								  ))
								: null}
						</ul>
					</section>
				</>
			)}
		</PageLayout>
	);
}

const head = css`
	position: relative;
	margin-bottom: 32px;
	padding: 32px 0;
	border-bottom: 1px solid var(--primary-t-100);
	& > h3 {
		color: var(--primary500);
	}
`;

const list__container = css`
	opacity: 0.7;
`;
const card = css`
	box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
	padding: 16px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
`;

const list = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	grid-gap: 24px;
	margin-top: 24px;
`;

const name = css`
	& > strong {
		margin-left: 5px;
	}
`;

const schedule = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	grid-gap: 12px;
	margin: 12px 0;
`;

const notfound = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transform: translateY(100%);
`;

const loader = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const nav = css`
	position: absolute;
	top: 25%;
	right: 0;
	@media screen and (max-width: 480px) {
		position: relative;
	}
`;
export default EventDetailsPage;
