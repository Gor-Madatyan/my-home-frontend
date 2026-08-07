import { read_cache } from '$lib/cache';
import { CACHE_KEYS } from '$lib/cacheKeys';

export function load() {
	const cached = read_cache<{ citations: unknown[] }>(CACHE_KEYS.citations);
	return { citations: cached?.data.citations ?? [], page: 0 };
}
