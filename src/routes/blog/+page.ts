import type { PageLoad } from './$types';
// import fetchPosts from './fetchPosts';
import fetchBlogs from './fetchBlogs';

export const load = (() => {
	return fetchBlogs();
}) satisfies PageLoad;
