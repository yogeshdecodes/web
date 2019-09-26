import axios from 'axios';
import {prettyAxiosError} from "lib/utils/error";

export async function installApp(token) {
	try {
		const payload = {token: token};
		const response = await axios.post('/apps/trello/register', payload);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function getTrelloWebhooks() {
	try {
		const response = await axios.get('/apps/trello/links')
		return response.data
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function resetTrello() {
    try {
        const response = await axios.post('/apps/trello/reset')
        return response.data
    } catch (e) {
        prettyAxiosError(e)
    }
}

export async function createTrelloWebhook(modelId, projectId) {
	try {
		const response = await axios.get(`/apps/trello/create_hook?model_id=${modelId}&project_id=${projectId}`)
		if (!response.data.success) {
			throw new Error("Coudln't create webhook for Trello.");
		}

		return response.data
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function getTrelloBoards() {
	try {
		const response = await axios.get('/apps/trello/boards')
		return response.data
	} catch (e) {
		prettyAxiosError(e)
	}
}