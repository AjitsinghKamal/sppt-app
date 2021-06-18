import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppShellLayout } from 'src/layouts';
import loadable from '@loadable/component';

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
					<Route path="/">
						<AsyncPage page="Home" />
					</Route>
				</Switch>
			</AppShellLayout>
		</BrowserRouter>
	);
}

/**
 * utility component to dynamically import any page component
 *
 * rollbar only allows dynamic import to be relative to the importer
 * hence, we need to keep this component together with Router
 * to keep import path clearer.
 *
 * specify @vite-ignore
 * since, vite will throw a warning due to no file-extension specification
 *
 */
const AsyncPage = loadable(
	({ page }: { page: string }) => import(/* @vite-ignore */ `./${page}`),
	{
		cacheKey: ({ page }) => page,
	}
);

export default Router;
