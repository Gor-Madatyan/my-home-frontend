import axios from 'axios';

export async function load() {
	const page = 0;
	const pageSize = 10;
	try {
		const response = await axios.get(`http://localhost:8080/posts?page_size=${pageSize}&page=${page}`);
		const data = response.data;
		const posts = (data.posts || []).map((item: any) => ({
			post_id: item.post_id,
			title: item.title,
			summary: item.summary,
			upload_date: item.upload_date,
			revision_date: item.revision_date,
			likes: item.likes,
		}));
		return { posts, page };
	} catch (e) {
		console.error(e);
		return { posts: [], page };
	}
}