import axios from 'axios';
import { api_base_url } from '$lib/utils';

export async function load() {
	try {
		const response = await axios.get(`${api_base_url}/posts?page_size=5&page=0`);
		const data = response.data;
		const posts = (data.posts || []).map(
			(item: {
				post_id: number;
				title: string;
				summary: string;
				upload_date: string;
				revision_date: string;
				likes: number;
			}) => ({
				post_id: item.post_id,
				title: item.title,
				summary: item.summary,
				upload_date: item.upload_date,
				revision_date: item.revision_date,
				likes: item.likes
			})
		);
		return { posts };
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		return { posts: [] };
	}
}
