<script lang="ts">
	import Citation from '$lib/Citation.svelte';

	let { data } = $props();
	const { citations } = data;
</script>

<div class="flex flex-col min-h-screen bg-black text-white p-6 md:p-8">
	<h2 class="text-2xl font-bold mb-6">some citations to think about 💭</h2>

	<!-- Placeholder note -->
	<div class="border border-white/20 p-4 mb-8 text-sm text-gray-400">
		Note: I will add a personal note here later.
	</div>

	<!-- Citations grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each citations as citation (citation.citation_id)}
			<Citation {citation} />
		{/each}
	</div>
</div>
