import {store} from 'store';

export function showFollowButton(user) {
	const state = store.getState();
	return state.auth.loggedIn && state.user.me && state.user.me.id !== user.id
}