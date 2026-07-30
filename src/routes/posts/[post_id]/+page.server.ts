import axios from 'axios';
import type { LoadEvent, Actions } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export async function load({ params, cookies }: LoadEvent) {
	const postId = params.post_id;
	const likedPostsCookie = cookies.get('likedPosts') ?? '[]';
	let likedPosts: string[] = [];
	try {
		likedPosts = JSON.parse(likedPostsCookie);
	} catch {
		likedPosts = [];
	}
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
		const likedPostsCookie = cookies.get('likedPosts') ?? '[]';
		let likedPosts: string[] = [];
		try {
			likedPosts = JSON.parse(likedPostsCookie);
		} catch {
			likedPosts = [];
		}
		if (likedPosts.includes(postId)) {
			// unlike
			likedPosts = likedPosts.filter(id => id !== postId);
		} else {
			// like
			likedPosts.push(postId);
		}
		cookies.set('likedPosts', JSON.stringify(likedPosts), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
		return { success: true };
	}
};
