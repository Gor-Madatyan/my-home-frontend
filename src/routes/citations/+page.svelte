<script lang="ts">
	import Citation from '$lib/Citation.svelte';
	import { load_citations } from '$lib/utils';

	let { data } = $props();
	let page = $state(data.page);
	let citations = $state(data.citations);
	let hasMore = $state(data.citations.length > 0);

	async function loadMore() {
		const nextPage = page + 1;
		const result = await load_citations(nextPage);
		if (result.citations.length === 0) {
			hasMore = false;
		} else {
			citations = [...citations, ...result.citations];
			page = nextPage;
		}
	}
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

	{#if hasMore}
		<button
			onclick={loadMore}
			class="mt-6 self-center border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
		>
			Load More
		</button>
	{/if}
</div>
