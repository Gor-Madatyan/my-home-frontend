import axios from 'axios';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ params }: LoadEvent) {
	const postId = params.post_id;
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
		return { post };
	} catch (error) {
		console.error('Failed to fetch post:', error);
		return { post: null };
	}
}
