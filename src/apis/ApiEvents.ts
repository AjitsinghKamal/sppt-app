import { API_HOST } from 'src/constants/env-defaults';
import ApiModuleComposer from './composer';

import { Pagination } from './types';

export const ENDPOINT = `${API_HOST}/events`;

type EventItem = {
	id: number;
	endsAt: string;
	startsAt: string;
	position: {
		color: string;
		id: number;
		name: string;
	};
};
type EventEmployee = {
	image: string;
	lastName: string;
	firstName: string;
	id: number;
};
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
	items: EventItem[];
	pagination: Pagination;
};

export const useEventList = ApiModuleComposer<
	EventListParams,
	EventListResponse
>(ENDPOINT);

/** ----------
 * GET: /events/:id
 *
 * fetch event detail by id
 * ------------- */

export type EventDetailsResponse = {
	employees: EventEmployee[];
} & EventItem;
export const useEventDetails = ApiModuleComposer<{}, EventDetailsResponse>(
	ENDPOINT
);
