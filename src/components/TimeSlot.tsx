import { css, cx } from '@emotion/css';
import { ReactComponent as Lit } from 'src/assets/lit.svg';
import { ReactComponent as Ban } from 'src/assets/ban.svg';
import { format } from 'date-fns';

export type Props = {
	type: 'start' | 'end';
	time?: string;
};

function TimeSlot({ type, time }: Props) {
	return (
		<div className={container}>
			{type === 'start' ? <Lit width={16} /> : <Ban width={16} />}
			<span title={`${type} at`}>
				{time ? format(new Date(time), 'MMM dd, yyyy') : '-'}
			</span>
		</div>
	);
}

const container = css`
	display: flex;
	align-items: center;
	& > svg {
		opacity: 0.6;
		margin-right: 10px;
	}
`;

export default TimeSlot;
