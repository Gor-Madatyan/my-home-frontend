import axios from 'axios';
import { api_base_url } from '$lib/utils';
import { dev } from '$app/environment';
import type { ServerLoadEvent, Cookies, RequestEvent } from '@sveltejs/kit';

// Helper to get unique liked posts as a Set, automatically stripping data duplicates
function getLikedPosts(cookies: Cookies): Set<string> {
	const cookie = cookies.get('likedPosts') ?? '[]';
	try {
		const parsed = JSON.parse(cookie);
		return new Set(Array.isArray(parsed) ? parsed : []);
	} catch {
		return new Set();
	}
}

// Helper to save liked posts back to cookies
function saveLikedPosts(cookies: Cookies, likedPosts: Set<string>): void {
	cookies.set('likedPosts', JSON.stringify([...likedPosts]), {
		path: '/posts',
		maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
		secure: !dev
	});
}

export async function load({ params, cookies }: ServerLoadEvent) {
	const postId = params.post_id!;
	const likedPosts = getLikedPosts(cookies);
	const isLiked = likedPosts.has(postId);

	try {
		const response = await axios.get(`${api_base_url}/posts/${postId}`);
		const data = response.data?.post ?? {};

		const post = {
			post_id: data.post_id ?? 0,
			title: data.title ?? '',
			summary: data.summary ?? '',
			upload_date: data.upload_date ?? '',
			revision_date: data.revision_date ?? '',
			body: data.body ?? '',
			tags: data.tags ?? [],
			likes: data.likes ?? 0
		};

		return { post, isLiked };
	} catch (error) {
		console.error('Failed to fetch post:', error);
		return { post: null, isLiked: false };
	}
}

export const actions = {
	toggleLike: async ({ params, cookies }: RequestEvent) => {
		const postId = params.post_id;
		if (!postId) {
			return { success: false, error: 'Missing post ID' };
		}

		const likedPosts = getLikedPosts(cookies);
		const currentlyLiked = likedPosts.has(postId);

		try {
			const endpoint = currentlyLiked
				? `${api_base_url}/posts/${postId}/unlike`
				: `${api_base_url}/posts/${postId}/like`;

			// Update cookie based on server response (or toggle as before)
			if (currentlyLiked) {
				likedPosts.delete(postId);
			} else {
				likedPosts.add(postId);
			}
			saveLikedPosts(cookies, likedPosts);
			await axios.put(endpoint);

			return { success: true };
		} catch (error) {
			console.error('Failed to toggle like:', error);
			return { success: false, error: 'Failed to update like' };
		}
	}
};
