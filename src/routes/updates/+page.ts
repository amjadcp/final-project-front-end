import type { PageLoad } from './$types';
import fetchPosts from './fetchPosts';
import fetchUpdates from './fetchUpdates';


export const load = (() => {
	// return fetchPosts();
	return fetchUpdates()
}) satisfies PageLoad;
