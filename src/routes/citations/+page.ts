import { load_citations } from '$lib/utils';

export async function load() {
	const result = await load_citations(0);
	return { ...result, page: 0 };
}
