import { useCallback } from 'react';
import { css, cx } from '@emotion/css';

import DayPickerInput from 'react-day-picker/DayPickerInput';

import { ReactComponent as CalendarIcon } from 'src/assets/calendar.svg';
import { ReactComponent as CloseIcon } from 'src/assets/close.svg';

import Button, { Props as ButtonProps } from './Button';

export type Props = {
	onSelect: (key: 'startDate' | 'endDate', day?: Date) => void;
	startDate?: Date;
	endDate?: Date;
};

const Clear = (props: ButtonProps) => (
	<Button type="ghost" {...props}>
		<CloseIcon width={14} />
	</Button>
);

function EventDatePicker({ onSelect, startDate, endDate }: Props) {
	const onStartDateSelect = useCallback(
		(day?: Date) => {
			onSelect('startDate', day);
		},
		[onSelect]
	);

	const onEndDateSelect = useCallback(
		(day?: Date) => {
			onSelect('endDate', day);
		},
		[onSelect]
	);

	return (
		<div className={container}>
			<div
				className={cx(action, {
					[action___focused]: !!(startDate && endDate),
				})}
			>
				<CalendarIcon width={20} />

				<div className={action__placeholder}>
					<DayPickerInput
						onDayChange={onStartDateSelect}
						placeholder="Start Date"
						value={startDate}
						dayPickerProps={
							endDate && {
								disabledDays: {
									after: endDate,
								},
							}
						}
					/>
					{startDate ? (
						<Clear onClick={() => onStartDateSelect()} />
					) : null}
				</div>
				<div className={action__placeholder}>
					<DayPickerInput
						onDayChange={onEndDateSelect}
						placeholder="End Date"
						value={endDate}
						dayPickerProps={
							startDate && {
								disabledDays: {
									before: startDate,
								},
							}
						}
					/>
				</div>
				{endDate ? <Clear onClick={() => onEndDateSelect()} /> : null}
			</div>
		</div>
	);
}

const container = css`
	position: relative;
	max-width: 100%;
`;

const action = css`
	display: flex;
	align-items: center;
	padding: 6px 12px;
	border-radius: 10px;
	background: var(--primary-t-100);
	cursor: pointer;
	transition: color 0.3s, box-shadow 0.3s;
	&:hover {
		color: var(--primary600);
		box-shadow: inset 0 0 0 3px var(--primary400);
	}
`;

const action__placeholder = css`
	margin: 0 10px;
	font-size: 0.875rem;
	color: inherit;
`;

const action___focused = css`
	color: var(--primary600);
	box-shadow: inset 0 0 0 3px var(--primary400);
`;
const picker = css`
	position: absolute;
	top: 100%;
	right: 0;
	display: none;
`;

const picker___show = css`
	display: block;
`;

export default EventDatePicker;
