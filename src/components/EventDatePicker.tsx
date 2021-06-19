import { css, cx } from '@emotion/css';
import { DateRangePicker, Range, OnChangeProps } from 'react-date-range';
import { usePopperTooltip } from 'react-popper-tooltip';
import { format } from 'date-fns';

import { ReactComponent as CalendarIcon } from 'src/assets/calendar.svg';
import { ReactComponent as CloseIcon } from 'src/assets/close.svg';
import { ReactComponent as SearchIcon } from 'src/assets/search.svg';

import Button from './Button';
import { useMemo } from 'react';

type Props = {
	onSelect: (selection: OnChangeProps) => void;
	selectedDates: Range[];
};

const getFormattedRange = (startDate?: Date, endDate?: Date) =>
	`${startDate ? format(startDate, 'MMM dd, yyyy') : ''} - ${
		endDate ? format(endDate, 'MMM dd, yyyy') : ''
	}`;

function EventDatePicker({ onSelect, selectedDates }: Props) {
	const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
		usePopperTooltip({
			trigger: 'click',
		});

	const hasDateSet = useMemo(
		() =>
			selectedDates &&
			(selectedDates[0].startDate || selectedDates[0].endDate),
		[selectedDates[0].startDate, selectedDates[0].endDate]
	);
	return (
		<div className={container}>
			<div
				ref={setTriggerRef}
				className={cx(action, {
					[action___focused]: visible,
				})}
			>
				{hasDateSet ? (
					<Button type="ghost">
						<CloseIcon width={20} />
					</Button>
				) : (
					<CalendarIcon width={20} />
				)}
				<span className={action__placeholder}>
					{hasDateSet
						? getFormattedRange(
								selectedDates[0].startDate,
								selectedDates[0].endDate
						  )
						: 'Select Date'}
				</span>
				{hasDateSet && (
					<Button type="ghost">
						<SearchIcon width={20} />
					</Button>
				)}
			</div>
			{visible && (
				<div
					ref={setTooltipRef}
					{...getTooltipProps({ className: 'tooltip-container' })}
				>
					<DateRangePicker
						showMonthAndYearPickers={false}
						editableDateInputs
						onChange={onSelect}
						moveRangeOnFirstSelection={false}
						ranges={selectedDates}
						staticRanges={[]}
						inputRanges={[]}
						direction="horizontal"
						showSelectionPreview={false}
					/>
				</div>
			)}
		</div>
	);
}

const container = css`
	position: relative;
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
