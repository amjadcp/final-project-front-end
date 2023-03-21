import type { PageLoad } from './$types';
import fetchMaterial from './fetchMaterial';


export const load = (() => {
	return fetchMaterial()
}) satisfies PageLoad;
