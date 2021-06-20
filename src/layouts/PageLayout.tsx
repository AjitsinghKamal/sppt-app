import { css } from '@emotion/css';
import { PropsWithChildren } from 'react';
import { Header } from 'src/components';

type Props = unknown;

/**
 * Default page layout
 *
 * can be used to set up any page meta info using react-helmet
 * TODO: configure helmet
 */
function PageLayout({ children }: PropsWithChildren<Props>) {
	return <main className={page}>{children}</main>;
}

const page = css`
	max-width: 900px;
	width: 100%;
	flex: 1;
`;
export default PageLayout;
