import { PropsWithChildren } from 'react';
import { Header } from 'src/components';

type Props = unknown;

/**
 * Default app shell for the app
 *
 * All routes are rendered as the children
 * to prevent re-rendering of common components like Header
 * which remain same across pages.
 *
 * By loading app-shell first and incrementally lazy loading
 * pages on demand we can reduce the user perception of TTL
 */
function AppShellLayout({ children }: PropsWithChildren<Props>) {
	return (
		<div>
			<Header />
			<div>{children}</div>
		</div>
	);
}

export default AppShellLayout;
