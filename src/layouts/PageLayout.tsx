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
	return <div>{children}</div>;
}

export default PageLayout;
