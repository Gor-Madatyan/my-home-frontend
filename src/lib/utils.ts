import axios from 'axios';

export const api_base_url = "http://gor/api";

export async function load_citations(page: number,author?:string, source?:string) {
	try {
		const response = await axios.get(
			`${api_base_url}/citations?page_size=10&page=${page}${author? `&author=${author}` : ''}${source? `&source=${source}` : ''}`
		);
		const data = response.data;
		const citations = (data.citations || []).map(
			(item: {
				citation_id: number;
				author: string;
				rizz: number;
				source: string;
				body: string;
			}) => ({
				citation_id: item.citation_id,
				author: item.author,
				rizz: item.rizz,
				source: item.source,
				body: item.body
			})
		);
		return { citations };
	} catch (error) {
		console.error('Failed to load citations:', error);
		return { citations: [] };
	}
}
