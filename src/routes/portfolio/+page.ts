import axios from 'axios';

export async function load() {
	try {
		const response = await axios.get('http://localhost:8080/portfolio');
		const data = response.data;
		const projects = (data.portfolio || []).map((item:{project_id:number,project_name:string,note:string}) => ({
			project_id: item.project_id,
			project_name: item.project_name,
			note: item.note
		}));
		return { projects };
	} catch (error) {
		console.error('Failed to fetch portfolio projects:', error);
		return { projects: [] };
	}
}
