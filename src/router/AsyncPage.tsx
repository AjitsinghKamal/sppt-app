import loadable from '@loadable/component';
import { IS_PROD } from 'src/constants/env-defaults';
/**
 * utility component to dynamically import any page component
 *
 * specify @vite-ignore
 * since, vite will throw a warning due to no file-extension specification
 *
 */
const AsyncPage = loadable(
	({ page }: { page: string }) => {
		return import(/* @vite-ignore */ `../pages/${page}.tsx`);
	},
	{
		cacheKey: ({ page }) => page,
	}
);

export default AsyncPage;
