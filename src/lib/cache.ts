interface CacheEntry<T> {
	timestamp: number;
	data: T;
}

const FRESH_TTL = 300_000;
const STORAGE_PREFIX = 'myhome_cache:';
const memoryStore = new Map<string, string>();
const inFlight = new Map<string, Promise<unknown>>();

function readStored(key: string): string | null {
	if (typeof window !== 'undefined') {
		try {
			const stored = window.localStorage.getItem(STORAGE_PREFIX + key);
			if (stored !== null) return stored;
		} catch (error) {
			console.error('localStorage read failed:', error);
		}
	}
	return memoryStore.get(key) ?? null;
}

function writeStored(key: string, value: string): void {
	if (typeof window !== 'undefined') {
		try {
			window.localStorage.setItem(STORAGE_PREFIX + key, value);
			return;
		} catch (error) {
			console.error('localStorage write failed:', error);
		}
	}
	memoryStore.set(key, value);
}

export function read_cache<T>(key: string): CacheEntry<T> | undefined {
	const raw = readStored(key);
	if (raw === null) return undefined;
	try {
		const entry = JSON.parse(raw) as CacheEntry<T>;
		if (typeof entry?.timestamp === 'number' && entry.data !== undefined) return entry;
	} catch (error) {
		console.error(`Failed to parse cache entry '${key}':`, error);
	}
	return undefined;
}

export function write_cache<T>(key: string, data: T): void {
	writeStored(key, JSON.stringify({ timestamp: Date.now(), data }));
}

export function is_fresh(entry: CacheEntry<unknown>): boolean {
	return Date.now() - entry.timestamp < FRESH_TTL;
}

function revalidate<T>(key: string, fetcher: () => Promise<T>, onFresh: (data: T) => void): void {
	const existing = inFlight.get(key);
	if (existing) {
		existing.then((data) => {
			if (data !== undefined) onFresh(data as T);
		});
		return;
	}
	const promise = fetcher()
		.then((data) => {
			write_cache(key, data);
			onFresh(data);
			return data as unknown;
		})
		.catch((error) => {
			console.error(`Background cache refresh for '${key}' failed; keeping cached data:`, error);
		})
		.finally(() => inFlight.delete(key));
	inFlight.set(key, promise);
}

export async function get_cached<T>(
	key: string,
	fetcher: () => Promise<T>,
	initial: T,
	onFresh: (data: T) => void
): Promise<T> {
	const entry = read_cache<T>(key);
	if (!entry) {
		revalidate(key, fetcher, onFresh);
		return initial;
	}
	if (is_fresh(entry)) {
		return entry.data;
	}
	revalidate(key, fetcher, onFresh);
	return entry.data;
}
