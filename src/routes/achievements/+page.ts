import fetchAchievements from './fetchAchievements';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {

	return await fetchAchievements()
}) satisfies PageLoad;