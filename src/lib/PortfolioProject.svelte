<script lang="ts">
	import { userGithub } from '../routes/+page.svelte';
	let {
		project_name,
		note,
		project_id
	}: { project_name: string; note: string; project_id: number } = $props();
</script>

<a
	href={`https://github.com/${userGithub}/${project_name}`}
	target="_blank"
	rel="noopener noreferrer"
	class="block max-w-sm rounded border border-gray-800 bg-gray-950 p-4 font-mono text-gray-200"
>
	<img
		src="https://opengraph.githubassets.com/{project_id}/{userGithub}/{project_name}"
		alt={project_name}
		class="w-full rounded border border-gray-800"
	/>
	{#if note}
		<p class="mt-2 text-sm">{note}</p>
	{/if}
</a>
