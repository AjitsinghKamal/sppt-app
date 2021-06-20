import { css, cx } from '@emotion/css';
import { PropsWithChildren, HTMLAttributes } from 'react';

export type Props = {
	type?: 'solid' | 'outline' | 'ghost';
} & HTMLAttributes<HTMLButtonElement>;

function Button({
	children,
	type = 'solid',
	...rest
}: PropsWithChildren<Props>) {
	return (
		<button
			{...rest}
			className={cx(btn, {
				[btn__solid]: type === 'solid',
				[btn__ghost]: type === 'ghost',
			})}
		>
			{children}
		</button>
	);
}

const btn = css`
	--width: 'auto';
	padding: 12px 24px;
	border-radius: 10px;
	font-weight: 600;
	transition: box-shadow 0.3s;
	display: inline-flex;
	align-items: center;
	width: var(--width);
	justify-content: center;
`;

const btn__solid = css`
	background: var(--primary-t-400);
	color: var(--primary600);
	&:hover {
		box-shadow: inset 0 0 0 3px var(--primary400);
	}
`;

const btn__ghost = css`
	background: transparent;
	padding: 6px;
	&:hover {
		color: var(--primary600);
	}
`;
export default Button;
