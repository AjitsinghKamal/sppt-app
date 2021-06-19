import Http from './http';
import { API_HOST } from 'src/constants/env-defaults';

export const ENDPOINT = `${API_HOST}/events`;

type GetListResponse = {};

export async function getEventList(
	params = {
		startsAt: '',
		endsAt: '',
		limit: 0,
		offset: 20,
	}
) {
	return Http(ENDPOINT, {
		params,
	});
}

export async function getEventDetails(params?: { id: number }) {
	return Http(ENDPOINT, {
		params,
	});
}
