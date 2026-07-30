import axios from 'axios';
import type { Actions, ServerLoadEvent } from '@sveltejs/kit';

function getLikedPosts(cookies: import('@sveltejs/kit').Cookies): string[] {
	const cookie = cookies.get('likedPosts') ?? '[]';
	try {
		return JSON.parse(cookie);
	} catch {
		return [];
	}
}

export async function load({ params, cookies }: ServerLoadEvent) {
	const postId = params.post_id!;
	const likedPosts = getLikedPosts(cookies);
	const isLiked = likedPosts.includes(postId);

	try {
		const response = await axios.get(`http://localhost:8080/posts/${postId}`);
		const data = response.data;
		const post = {
			post_id: data.post?.post_id ?? 0,
			title: data.post?.title ?? '',
			summary: data.post?.summary ?? '',
			upload_date: data.post?.upload_date ?? '',
			revision_date: data.post?.revision_date ?? '',
			body: data.post?.body ?? '',
			tags: data.post?.tags ?? [],
			likes: data.post?.likes ?? 0
		};
		return { post, isLiked };
	} catch (error) {
		console.error('Failed to fetch post:', error);
		return { post: null, isLiked: false };
	}
}

export const actions: Actions = {
	toggleLike: async ({ params, cookies }) => {
		const postId = params.post_id;
		if (!postId) {
			return { success: false, error: 'Missing post ID' };
		}
		const likedPosts = getLikedPosts(cookies);
		if (likedPosts.includes(postId)) {
			// unlike
			likedPosts.splice(likedPosts.indexOf(postId), 1);
		} else {
			// like
			likedPosts.push(postId);
		}
		cookies.set('likedPosts', JSON.stringify(likedPosts), {
			path: '/',
		});
		return { success: true };
	}
};
