<script lang="ts">
	import Citation from '$lib/Citation.svelte';
	import { load_citations } from '$lib/utils';

	let { data } = $props();
	let page = $derived(data.page);
	let citations = $derived(data.citations);
	let hasMore = $derived(data.citations.length > 0);

	let authorInput = $state('');
	let sourceInput = $state('');

	let currentAuthor = $state('');
	let currentSource = $state('');

	async function search() {
		currentAuthor = authorInput;
		currentSource = sourceInput;
		page = 0;
		const result = await load_citations(0, currentAuthor || undefined, currentSource || undefined);
		citations = result.citations;
		hasMore = result.citations.length > 0;
	}

	async function loadMore() {
		const nextPage = page + 1;
		const result = await load_citations(nextPage, currentAuthor || undefined, currentSource || undefined);
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

	<!-- search inputs -->
	<div class="flex flex-col sm:flex-row gap-4 mb-8">
		<input
			type="text"
			placeholder="Filter by author"
			bind:value={authorInput}
			class="bg-neutral-800 border border-white/20 px-3 py-2 text-sm text-white focus:outline-none"
		/>
		<input
			type="text"
			placeholder="Filter by source"
			bind:value={sourceInput}
			class="bg-neutral-800 border border-white/20 px-3 py-2 text-sm text-white focus:outline-none"
		/>
		<button
			onclick={search}
			class="border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
		>
			Search
		</button>
	</div>

	<!-- Placeholder note -->
	<div class="border border-white/20 p-4 mb-8 text-sm text-gray-400">
		Here are some citations which I want to store so I can keep them somewhere grouped.
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
