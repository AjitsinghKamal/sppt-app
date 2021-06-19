import { css } from '@emotion/css';
import { PropsWithChildren, DOMAttributes } from 'react';

type Props = {
	type?: 'solid' | 'outline' | 'ghost';
};

function Button({
	children,
	type = 'solid',
	...rest
}: PropsWithChildren<Props> & DOMAttributes<HTMLButtonElement>) {
	return (
		<button {...rest} className={__btn}>
			{children}
		</button>
	);
}

const __btn = css`
	padding: 12px 24px;
	border-radius: 10px;
	background: var(--primary-t-400);
	color: var(--primary600);
	font-weight: 600;
	transition: box-shadow 0.3s;
	&:hover {
		box-shadow: inset 0 0 0 3px var(--primary400);
	}
`;
export default Button;
