import axios from 'axios';
import { api_base_url, site_url } from '$lib/utils';
import type { RequestHandler } from './$types';

interface SitemapPost {
	post_id: number;
	upload_date: string;
	revision_date: string;
}

const PAGE_SIZE = 50;

const STATIC_PATHS: { loc: string; priority: string; freq: string }[] = [
	{ loc: '', priority: '1.0', freq: 'weekly' },
	{ loc: '/me', priority: '0.8', freq: 'monthly' },
	{ loc: '/posts', priority: '0.7', freq: 'weekly' },
	{ loc: '/portfolio', priority: '0.6', freq: 'monthly' },
	{ loc: '/citations', priority: '0.5', freq: 'monthly' },
	{ loc: '/toolchain', priority: '0.3', freq: 'yearly' }
];

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

// API dates arrive as ISO 8601 (e.g. "2026-08-07T16:18:39Z") or legacy "YYYY-MM-DD HH:MM:SS".
// Sitemaps want a clean W3C date: reduce to "YYYY-MM-DD".
function toDate(value: string): string {
	const match = /^\d{4}-\d{2}-\d{2}/.exec(value);
	return match ? match[0] : '';
}

function lastmod(path: string, post?: SitemapPost): string {
	const src = post?.revision_date || post?.upload_date;
	if (src) return escapeXml(toDate(src));
	if (path === '' || path === '/posts') return new Date().toISOString().split('T')[0];
	const today = new Date();
	return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
}

async function fetchAllPostIds(): Promise<SitemapPost[]> {
	const posts: SitemapPost[] = [];
	let page = 0;
	try {
		while (true) {
			const response = await axios.get(`${api_base_url}/posts?page_size=${PAGE_SIZE}&page=${page}`);
			const batch: SitemapPost[] = (response.data?.posts ?? []).map((p: SitemapPost) => ({
				post_id: p.post_id,
				upload_date: p.upload_date,
				revision_date: p.revision_date
			}));
			if (batch.length === 0) break;
			posts.push(...batch);
			if (batch.length < PAGE_SIZE) break;
			page += 1;
		}
	} catch (error) {
		console.error('Failed to fetch posts for sitemap:', error);
	}
	return posts;
}

export const GET: RequestHandler = async () => {
	const postIds = await fetchAllPostIds();

	const urls: string[] = [
		...STATIC_PATHS.map(
			(s) =>
				`<url><loc>${escapeXml(site_url + s.loc)}</loc><lastmod>${lastmod(
					s.loc
				)}</lastmod><changefreq>${s.freq}</changefreq><priority>${s.priority}</priority></url>`
		),
		...postIds.map(
			(p) =>
				`<url><loc>${escapeXml(`${site_url}/posts/${p.post_id}`)}</loc><lastmod>${lastmod(
					'',
					p
				)}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`
		)
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
