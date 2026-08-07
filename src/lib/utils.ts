import axios from 'axios';
import { browser } from '$app/environment';

// On the client, requests go to the same origin under /api.
// On the server (SSR), a relative path has no base URL, so use the absolute API origin.
export const api_base_url = browser ? '/api' : 'https://gormadatyan.xyz/api';

// Canonical public origin, used for SEO (canonical URLs, sitemap, OG tags).
export const site_url = 'https://gormadatyan.xyz';

interface CitationItem {
	citation_id: number;
	author: string;
	rizz: number;
	source: string;
	body: string;
}

function citations_url(page: number, author?: string, source?: string): string {
	return `${api_base_url}/citations?page_size=10&page=${page}${author ? `&author=${author}` : ''}${source ? `&source=${source}` : ''}`;
}

function map_citations(items: CitationItem[]): CitationItem[] {
	return items.map((item) => ({
		citation_id: item.citation_id,
		author: item.author,
		rizz: item.rizz,
		source: item.source,
		body: item.body
	}));
}

export async function load_citations(page: number, author?: string, source?: string) {
	try {
		return await fetch_citations_strict(page, author, source);
	} catch (error) {
		console.error('Failed to load citations:', error);
		return { citations: [] };
	}
}

export async function fetch_citations_strict(
	page: number,
	author?: string,
	source?: string
): Promise<{ citations: CitationItem[] }> {
	const response = await axios.get(citations_url(page, author, source));
	return { citations: map_citations((response.data.citations || []) as CitationItem[]) };
}
