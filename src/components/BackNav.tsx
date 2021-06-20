import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';

function BackNav({ wrapperClass }: { wrapperClass?: string }) {
	return (
		<nav className={cx(nav, wrapperClass)}>
			<Link to="/">Go Back to Events List</Link>
		</nav>
	);
}

const nav = css`
	color: var(--primary500);
`;
export default BackNav;
