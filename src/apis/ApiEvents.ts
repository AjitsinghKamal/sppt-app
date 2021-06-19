import { API_HOST } from 'src/constants/env-defaults';
import ApiModuleComposer, { Composer } from './composer';

import { Pagination } from './types';

export const ENDPOINT = `${API_HOST}/events`;

/** ----------
 * GET: /events
 *
 * fetch list of events
 * ------------- */

export type EventListParams = {
	startsAt?: string;
	endsAt?: string;
	limit?: number;
	offset?: number;
};

export type EventListResponse = {
	items: {
		id: number;
		endsAt: string;
		startsAt: string;
		position: {
			color: string;
			id: number;
			name: string;
		};
	}[];
	pagination: Pagination;
};

export const useEventList = (options: Composer<EventListParams> = {}) =>
	ApiModuleComposer<EventListParams, EventListResponse>(ENDPOINT, options);

/** ----------
 * GET: /events/:id
 *
 * fetch event detail by id
 * ------------- */
type EventDetailsParams = {
	id: number;
};
export const useEventDetails = (options: Composer<EventDetailsParams>) =>
	ApiModuleComposer(ENDPOINT, options);
