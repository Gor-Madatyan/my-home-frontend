import { load_citations } from '$lib/utils';

export async function load() {
	return await load_citations(0);
}
