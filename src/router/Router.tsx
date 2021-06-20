import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppShellLayout } from 'src/layouts';
import AsyncPage from './AsyncPage';
/**
 * Top-Level routing config for the app
 *
 * use AsyncPage component to lazyload the page chunk on-demand
 */
function Router() {
	return (
		<BrowserRouter>
			<AppShellLayout>
				<Switch>
					<Route path="/:eventId">
						<AsyncPage page="EventDetails" />
					</Route>
					<Route path="/">
						<AsyncPage page="Events" />
					</Route>
				</Switch>
			</AppShellLayout>
		</BrowserRouter>
	);
}

export default Router;
