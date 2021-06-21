import { css } from '@emotion/css';
import { ReactComponent as Spinner } from 'src/assets/spinner.svg';

function Fallback() {
	return <Spinner width={48} className={loader} />;
}

const loader = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default Fallback;
