import { css } from '@emotion/css';
import { PropsWithChildren, useState, useEffect } from 'react';
import { Button } from 'src/components';

import { ReactComponent as Spinner } from 'src/assets/spinner.svg';

export type Props = {
	showNotFound?: boolean;
	showLoader?: boolean;
	onLoadMore?: () => void;
	hasMore?: boolean;
};
function List({
	children,
	showNotFound,
	showLoader,
	onLoadMore,
	hasMore,
}: PropsWithChildren<Props>) {
	const [isNextLoading, setNextLoading] = useState(false);

	const handleLoadMore = () => {
		setNextLoading(true);
		onLoadMore && onLoadMore();
	};
	useEffect(() => {
		!showLoader && isNextLoading && setNextLoading(false);
	}, [showLoader]);

	return (
		<div className={container}>
			{showLoader && !isNextLoading ? (
				<div className={loader}>
					<Spinner width={32} />
				</div>
			) : showNotFound ? (
				<p className={placeholder}>Nothing Found :(</p>
			) : (
				<>
					<ul className={list}>{children}</ul>
					{hasMore ? (
						<Button
							onClick={handleLoadMore}
							style={{
								['--width' as any]: '200px',
							}}
						>
							{isNextLoading ? (
								<Spinner width={24} />
							) : (
								'Load More'
							)}
						</Button>
					) : null}
				</>
			)}
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

const placeholder = css`
	align-self: flex-start;
	margin: 32px 0;
	font-size: 1.2rem;
	opacity: 0.4;
	font-weight: 300;
`;

const loader = css`
	transform: translateY(100px);
`;

export default List;
