import type { PageLoad } from './$types';
import ghostClient from '$lib/blog/client';
import { error } from '@sveltejs/kit';
import fetchUpdate from '../fetchUpdate';

export const load = (async ({ params }) => {
	try {
		// See post data model: https://ghost.org/docs/content-api/#posts
		return await fetchUpdate(params.id)
		// await ghostClient.posts.read({ slug: params.id }, { formats: ['html'] });
	} catch (e: any) {
		const status = e.response?.status || 500;
		if (status === 404 || status === 422) {
			throw error(404, `Blog post not found: ${params.id}`);
		} else {
			throw error(status, e.message);
		}
	}
}) satisfies PageLoad;
