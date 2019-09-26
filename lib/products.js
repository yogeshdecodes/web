import axios from 'axios';
import {prettyAxiosError} from "./utils/error";

export async function getProducts(userId = null) {
	try {
		let endpoint = '/products/';
		if (userId) {
			endpoint = `/users/${userId}/products/`
		}
		const response = await axios.get(endpoint);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function getMyProducts() {
	try {
		const response = await axios.get('/products/me/');
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}


export async function getProductBySlug(slug) {
	try {
		const response = await axios.get(`/products/${slug}/`);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function getProductPeople(slug) {
	try {
		const response = await axios.get(`/products/${slug}/people/`);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function getProductStats(slug) {
	try {
		const response = await axios.get(`/products/${slug}/stats/`);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function deleteProduct(slug) {
	try {
		const response = await axios.delete(`/products/${slug}/`);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function leaveProduct(slug) {
	try {
		const response = await axios.post(`/products/${slug}/leave/`);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function getRecentlyLaunched() {
	try {
		const response = await axios.get(`/products/recently_launched/`);
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

//TODO: Refactor to object passing all params.
export async function createProduct(
	name,
	description,
	projects,
	productHunt,
	twitter,
	website,
	launched,
	icon,
	team
) {
	try {
		let data = new FormData();
		const headers = {
			'Content-Type': 'multipart/form-data'
		}
		if (icon !== null) {
			data.append("icon", icon);
		}
		data.append("name", name);
		if (productHunt) data.append('product_hunt', productHunt);
		if (twitter) data.append('twitter', twitter);
		data.append('description', description);
		if (website) data.append('website', website);
		data.append('launched', launched);
		for (var i = 0; i < team.length; i++) {
			data.append('team', team[i]);
		}
		for (var ii = 0; ii < projects.length; ii++) {
			data.append('projects', projects[ii]);
		}
		let url = '/products/';
		const response = await axios.post(url, data, {headers})
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}

export async function editProduct(
	slug,
	name,
	description,
	projects,
	productHunt,
	twitter,
	website,
	launched,
	icon,
	team
) {
	try {
		let data = new FormData();
		const headers = {
			'Content-Type': 'multipart/form-data'
		}
		if (icon !== null) {
			data.append("icon", icon);
		}
		data.append("name", name);
		if (productHunt) data.append('product_hunt', productHunt);
		if (twitter) data.append('twitter', twitter);
		data.append('description', description);
		if (website) data.append('website', website);
		data.append('launched', launched);

		for (var ii = 0; ii < projects.length; ii++) {
			data.append('projects', projects[ii]);
		}

		for (var i = 0; i < team.length; i++) {
			data.append('team', team[i]);
		}

		let url = `/products/${slug}/`;
		const response = await axios.patch(url, data, {headers})
		return response.data;
	} catch (e) {
		prettyAxiosError(e)
	}
}