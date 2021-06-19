import { css } from '@emotion/css';

type Props = {
	title: string;
	start: string;
	end: string;
	color: string;
};
function EventItem({ title, start, end, color }: Props) {
	return (
		<div className={__card}>
			<p>{title}</p>
		</div>
	);
}

const __card = css`
	box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
	padding: 16px;
	border-radius: 10px;
`;

export default EventItem;
