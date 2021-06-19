import { css } from '@emotion/css';
import { PropsWithChildren } from 'react';
import { Button } from 'src/components';

export type Props = {
	total?: number;
	offset?: number;
};
function List({ children, total, offset }: PropsWithChildren<Props>) {
	return (
		<div className={__container}>
			<ul className={__list}>{children}</ul>
			<Button>Load More</Button>
		</div>
	);
}

const __container = css`
	margin: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const __list = css`
	align-self: stretch;
`;

export default List;
