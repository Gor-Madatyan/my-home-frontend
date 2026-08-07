<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import PortfolioProject from '$lib/PortfolioProject.svelte';
	import { get_cached } from '$lib/cache';
	import { CACHE_KEYS } from '$lib/cacheKeys';
	import { api_base_url, site_url } from '$lib/utils';
	import Seo from '$lib/Seo.svelte';

	interface Project {
		project_id: number;
		project_name: string;
		note: string;
	}

	let { data } = $props();

	async function fetchProjects(): Promise<Project[]> {
		const response = await axios.get(`${api_base_url}/portfolio`);
		return ((response.data.portfolio || []) as Project[]).map((item) => ({
			project_id: item.project_id,
			project_name: item.project_name,
			note: item.note
		}));
	}

	// svelte-ignore state_referenced_locally
	let projects = $state((data.projects as Project[]) ?? []);

	onMount(async () => {
		projects = await get_cached(
			CACHE_KEYS.portfolio,
			fetchProjects,
			data.projects as Project[],
			(fresh) => {
				projects = fresh;
			}
		);
	});
</script>

<div class="flex min-h-screen flex-col bg-black p-6 text-white md:p-8">
	<Seo
		title="Portfolio"
		description="Projects of Gor Madatyan — his most important personal and open-source software projects."
		url={`${site_url}/portfolio`}
	/>
	<h2 class="mb-6 text-2xl font-bold">The things I hacked so far 🛠️</h2>

	<p class="mb-8 text-gray-400 italic">
		These are the most important projects of mine, this page will motivate me to do even more cool
		stuff 😏
	</p>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each projects as project (project.project_id)}
			<PortfolioProject
				project_name={project.project_name}
				note={project.note}
				project_id={project.project_id}
			/>
		{/each}
	</div>
</div>
