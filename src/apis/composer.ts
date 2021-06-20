import { useMemo, useEffect, DependencyList } from 'react';
import Http, { FetchOptions } from './http';

import useResponseState from '../hooks/UseResponseState';
import { AUTH_SECRET } from '../constants/env-defaults';

export type Composer<FetchParamsType> = FetchOptions<FetchParamsType> & {
	// if present will request api on dependency change or after mount if empty array
	dependencies?: DependencyList;
	// allows appending path to base url
	path?: string;
};

/**
 * generate react-hook based api modules
 * @param url API endpoint bound to the module
 * @param config fetch compliant config
 * @param isAuthenticated adds authoirisation header to request
 */
const ApiModuleComposer =
	<FetchParamsType, FetchResponseType>(url: string) =>
	(config: Composer<FetchParamsType>, isAuthenticated: boolean = true) => {
		const { responseState, dispatch } =
			useResponseState<FetchResponseType>();

		const runWithEffect = config.dependencies;

		const { dependencies = [], path = '', ...restOptions } = config;

		const fetchUrl = `${url}${path}`;
		// append auth header if needed
		if (isAuthenticated && AUTH_SECRET) {
			restOptions.headers = {
				...restOptions.headers,
				Authorization: `Basic ${AUTH_SECRET}`,
			};
		}

		/**
		 * handles api request and update the response state on demand
		 *
		 * @param requestConfig
		 * fetch options
		 *
		 * @param noAutoResponseUpdate
		 * will disable auto update of response state
		 * useful if you want to manipulate data before updating to state
		 * for e.g updating pages for an infinite list
		 *
		 */
		const request = async (
			requestConfig: FetchOptions<FetchParamsType>,
			noAutoResponseUpdate?: boolean
		) => {
			dispatch({ type: 'fetch' });
			try {
				const response = await Http<FetchParamsType, FetchResponseType>(
					fetchUrl,
					{ ...restOptions, ...requestConfig }
				);
				if (noAutoResponseUpdate) {
					return response;
				} else {
					dispatch({
						type: 'update',
						payload: {
							response,
						},
					});
				}
			} catch (error) {
				dispatch({
					type: 'update',
					payload: {
						error,
					},
				});
			}
		};

		useEffect(() => {
			// if dependencies is present
			// auto fetch the data as per dependency list
			runWithEffect && request(restOptions);
		}, dependencies);

		const state = useMemo(
			() => ({
				...responseState,
				request,
				dispatch,
			}),
			[request, responseState]
		);

		return state;
	};

export default ApiModuleComposer;
