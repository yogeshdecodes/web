import axios from 'axios';
import {prettyAxiosError} from "../utils/error";

export async function getClientId() {
	try {
		const creds = axios.get('/apps/slack/add');
		return creds.client_id;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function makeRequestUrl() {
	const clientId = await getClientId();
	return `https://slack.com/oauth/authorize?${clientId}`;
}

export async function registerSlackIntegration(code) {
	try {
		const resp = await axios.get(`/slack/register/?code=${code}`);
		return resp.message;
	} catch (e) {
		prettyAxiosError(e)
	}
}