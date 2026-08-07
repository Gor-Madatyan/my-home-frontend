import { read_cache } from '$lib/cache';
import { CACHE_KEYS } from '$lib/cacheKeys';

export function load() {
	const cached = read_cache<unknown[]>(CACHE_KEYS.portfolio);
	return { projects: cached?.data ?? [] };
}
