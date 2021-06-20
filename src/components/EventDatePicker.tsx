import { ChangeEvent, useMemo } from 'react';
import { css, cx } from '@emotion/css';
import { formatISO } from 'date-fns';

import Button from './Button';
import { ReactComponent as FilterIcon } from 'src/assets/filter.svg';

export type Props = {
	onSelect: (key: string, day?: string) => void;
	onReset: () => void;
	startDate?: string;
	endDate?: string;
};

function EventDatePicker({ onSelect, onReset, startDate, endDate }: Props) {
	const onDateSelect = (dateEvent: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { valueAsDate, name },
		} = dateEvent;
		onSelect(name, valueAsDate ? formatISO(valueAsDate) : undefined);
	};

	const formattedStart = useMemo(
		() => (startDate ? startDate.split('T')[0] : ''),
		[startDate]
	);

	const formattedEnd = useMemo(
		() => (endDate ? endDate.split('T')[0] : ''),
		[endDate]
	);
	return (
		<div className={container}>
			<span className={title}>
				<FilterIcon width={12} />
				Filter by Date
			</span>
			<form
				className={cx(action, {
					[action___focused]: !!(startDate && endDate),
				})}
			>
				<label className={action__placeholder}>
					Start
					<input
						type="date"
						name="startDate"
						placeholder="Start Date"
						onChange={onDateSelect}
						value={formattedStart}
						max={formattedEnd}
						className={input}
					/>
				</label>
				<label className={action__placeholder}>
					End
					<input
						type="date"
						name="endDate"
						placeholder="Start Date"
						onChange={onDateSelect}
						value={formattedEnd}
						min={formattedStart}
						className={input}
					/>
				</label>
			</form>
			{startDate && endDate ? (
				<span className={reset}>
					<Button type="ghost" onClick={onReset} role="button">
						Reset
					</Button>
				</span>
			) : null}
		</div>
	);
}

const container = css`
	position: relative;
	max-width: 100%;
	text-align: right;
`;

const title = css`
	font-size: 0.75rem;
	font-weight: 300;
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

const input = css`
	border: 0;
	padding: 2px 6px;
	border-radius: 6px;
	margin-left: 6px;
	&:focus,
	&:focus-visible {
		border: 0;
		box-shadow: none;
	}
`;

const reset = css`
	opacity: 0.6;
`;
export default EventDatePicker;
