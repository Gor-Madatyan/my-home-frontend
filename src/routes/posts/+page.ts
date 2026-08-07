import { read_cache } from '$lib/cache';
import { CACHE_KEYS } from '$lib/cacheKeys';

export function load() {
	const cached = read_cache<{ posts: unknown[]; page: number }>(CACHE_KEYS.posts_list);
	return cached?.data ?? { posts: [], page: 0 };
}
