import { css } from '@emotion/css';
import { PropsWithChildren } from 'react';
import { Button } from 'src/components';

export type Props = {
	total?: number;
	offset?: number;
};
function List({ children, total, offset }: PropsWithChildren<Props>) {
	return (
		<div className={container}>
			<ul className={list}>{children}</ul>
			<Button>Load More</Button>
		</div>
	);
}

const container = css`
	margin: 12px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const list = css`
	align-self: stretch;
`;

export default List;
