import { css } from '@emotion/css';
import { TimeSlot } from 'src/components';

type Props = {
	title: string;
	start: string;
	end: string;
	color: string;
};
function EventItem({ title, start, end, color }: Props) {
	return (
		<div className={card}>
			<p className={label}>
				<span className={clr} style={{ background: color }}></span>
				{title}
			</p>
			<div className={timecontainer}>
				<TimeSlot time={start} type="start" />
				<TimeSlot time={end} type="end" />
			</div>
		</div>
	);
}

const label = css`
	font-size: 1.2rem;
	font-weight: 600;
`;
const card = css`
	box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
	padding: 16px;
	border-radius: 10px;
	transition: background 0.3s;
	&:hover {
		background: var(--primary-t-200);
	}
`;

const clr = css`
	width: 12px;
	height: 12px;
	display: inline-block;
	border-radius: 50%;
	margin-right: 10px;
`;

const timecontainer = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 250px));
	margin-top: 16px;
`;
export default EventItem;
