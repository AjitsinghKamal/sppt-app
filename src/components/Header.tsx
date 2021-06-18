import { css } from '@emotion/css';

function Header() {
	return <header className={base}></header>;
}

//#region styles
const base = css`
	height: 80px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
`;

export default Header;
