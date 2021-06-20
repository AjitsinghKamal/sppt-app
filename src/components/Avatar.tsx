import { css, cx } from '@emotion/css';

export type Props = {
	src?: string;
	name: string;
};

function Avatar({ src, name }: Props) {
	return (
		<div className={container}>
			{src ? <img src={src} alt={name} /> : <span>{name[0]}</span>}
		</div>
	);
}

const container = css`
	border-radius: 10px;
	overflow: hidden;
	width: 100%;
	height: 70%;
	& > img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

export default Avatar;
