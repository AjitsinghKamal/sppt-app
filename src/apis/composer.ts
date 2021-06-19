import { useMemo, useEffect, DependencyList } from 'react';
import useResponseState from 'src/hooks/UseResponseState';
import Http, { FetchOptions } from './http';
import { AUTH_SECRET } from 'src/constants/env-defaults';

export type Composer<FetchParamsType> = FetchOptions<FetchParamsType> & {
	// if present will request api on dependency change or after mount if empty array
	dependencies?: DependencyList;
};

/**
 * generate react-hook based api modules
 * @param url API endpoint bound to the module
 * @param config fetch compliant config
 * @param isAuthenticated adds authoirisation header to request
 */
const ApiModuleComposer = <FetchParamsType, FetchResponseType>(
	url: string,
	config: Composer<FetchParamsType>,
	isAuthenticated: boolean = true
) => {
	const { responseState, dispatch } = useResponseState<FetchResponseType>();
	const { dependencies, ...restOptions } = config;

	const effectDependecyList = dependencies || [];

	if (isAuthenticated && AUTH_SECRET) {
		restOptions.headers = {
			...restOptions.headers,
			Authorization: `Basic ${AUTH_SECRET}`,
		};
	}

	const request = async (requestConfig: FetchOptions<FetchParamsType>) => {
		dispatch({ type: 'fetch' });
		try {
			const response = await Http<FetchParamsType, FetchResponseType>(
				url,
				requestConfig
			);
			dispatch({
				type: 'update',
				payload: {
					response,
				},
			});
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
		dependencies && request(restOptions);
	}, effectDependecyList);

	const state = useMemo(
		() => ({
			...responseState,
			request,
		}),
		[request, responseState]
	);

	return state;
};

export default ApiModuleComposer;
