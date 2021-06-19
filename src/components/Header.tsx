import { css } from '@emotion/css';

function Header() {
	return <header className={__base}></header>;
}

//#region styles
const __base = css`
	height: var(--header-h);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: var(--white400);
	box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

export default Header;
