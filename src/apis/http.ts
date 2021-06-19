import qs from 'qs';

/**
 * wrapper for error message
 */
export class HttpError {
	statusCode: number;
	error: any;
	constructor(statusCode: number, error: any) {
		this.statusCode = statusCode;
		this.error = error;
	}
}

type FetchOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
	params?: any;
	paramsEncoder?: any;
	body?: any;
	headers?: Record<string, string>;
	[x: string]: any;
};
/**
 * Wrapper for fetch api
 * makes the handling of responses and errors
 * more predictable and intuitive
 *
 * @param url API endpoint
 * @param params qs accepted params
 * @param paramsEncoder custom encoder for params
 * @param body payload to send with request
 * @param headers fetch accepted headers
 *
 */
async function Http<ResponseType>(
	url: string,
	config: FetchOptions = {
		method: 'GET',
		params: '',
		headers: {},
	}
) {
	const { method, params, headers, paramsEncoder, body, ...rest } = config;

	const fetchOptions: Omit<
		FetchOptions,
		'params' | 'paramsEncoder' | 'body'
	> = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		...rest,
	};

	if (body) {
		fetchOptions.body = JSON.stringify(body);
	}
	const requestParams = params
		? `?${qs.stringify(params, paramsEncoder)}`
		: '';

	const requestData = await fetch(`${url}${requestParams}`, fetchOptions);

	// fetch resolves after response headers are received
	// so, response can also be of erroneous nature
	const response: ResponseType = await requestData.json();

	if (requestData.ok) {
		// forward to thenable only if fetch resolved with 2XX
		return response;
	} else {
		// in case of error, we throw a custom error so that
		// it can be picked up by catch block easily
		throw new HttpError(requestData.status, response);
	}
}

export default Http;
