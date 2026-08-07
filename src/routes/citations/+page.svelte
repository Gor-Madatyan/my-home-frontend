<script lang="ts">
	import { onMount } from 'svelte';
	import Citation from '$lib/Citation.svelte';
	import { get_cached } from '$lib/cache';
	import { CACHE_KEYS } from '$lib/cacheKeys';
	import { fetch_citations_strict, load_citations, site_url } from '$lib/utils';
	import Seo from '$lib/Seo.svelte';

	let { data } = $props();

	interface Citation {
		citation_id: number;
		author: string;
		rizz: number;
		source: string;
		body: string;
	}

	// svelte-ignore state_referenced_locally
	let page = $state(data.page ?? 0);
	// svelte-ignore state_referenced_locally
	let citations = $state((data.citations as Citation[]) ?? []);
	// svelte-ignore state_referenced_locally
	let hasMore = $state(citations.length > 0);

	onMount(async () => {
		const result = await get_cached(
			CACHE_KEYS.citations,
			() => fetch_citations_strict(0),
			{ citations: [] },
			(fresh) => {
				citations = fresh.citations;
			}
		);
		citations = result.citations;
		hasMore = result.citations.length > 0;
		page = 0;
	});

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
		const result = await load_citations(
			nextPage,
			currentAuthor || undefined,
			currentSource || undefined
		);
		if (result.citations.length === 0) {
			hasMore = false;
		} else {
			citations = [...citations, ...result.citations];
			page = nextPage;
		}
	}
</script>

<div class="flex min-h-screen flex-col bg-black p-6 text-white md:p-8">
	<Seo
		title="Citations"
		description="A collection of citations and meaningful passages from books that Gor Madatyan has read over the years."
		url={`${site_url}/citations`}
	/>
	<h2 class="mb-6 text-2xl font-bold">some citations to think about 💭</h2>

	<!-- search inputs -->
	<div class="mb-8 flex flex-col gap-4 sm:flex-row">
		<input
			type="text"
			placeholder="Filter by author"
			bind:value={authorInput}
			class="border border-white/20 bg-neutral-800 px-3 py-2 text-sm text-white focus:outline-none"
		/>
		<input
			type="text"
			placeholder="Filter by source"
			bind:value={sourceInput}
			class="border border-white/20 bg-neutral-800 px-3 py-2 text-sm text-white focus:outline-none"
		/>
		<button
			onclick={search}
			class="border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10"
		>
			Search
		</button>
	</div>

	<!-- Placeholder note -->
	<div class="mb-8 border border-white/20 p-4 text-sm text-gray-400">
		Here are some citations which I want to store so I can keep them somewhere grouped.
	</div>

	<!-- Citations grid -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each citations as citation (citation.citation_id)}
			<Citation {citation} />
		{/each}
	</div>

	{#if hasMore}
		<button
			onclick={loadMore}
			class="mt-6 self-center border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10"
		>
			Load More
		</button>
	{/if}
</div>
