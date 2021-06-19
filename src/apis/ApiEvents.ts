import { API_HOST } from 'src/constants/env-defaults';
import ApiModuleComposer, { Composer } from './composer';

export const ENDPOINT = `${API_HOST}/events`;

type EventListParams = {
	startsAt?: string;
	endsAt?: string;
	limit?: number;
	offset?: number;
};

type EventListResponse = {
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
};

export const useEventList = (options: Composer<EventListParams> = {}) =>
	ApiModuleComposer<EventListParams, EventListResponse>(ENDPOINT, options);

type EventDetailsParams = {
	id: number;
};
export const useEventDetails = (options: Composer<EventDetailsParams>) =>
	ApiModuleComposer(ENDPOINT, options);
