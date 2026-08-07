<script lang="ts">
	interface Citation {
		citation_id: number;
		author: string;
		rizz: number;
		source: string;
		body: string;
	}

	let { citation }: { citation: Citation } = $props();
</script>

<div class="grid grid-cols-[1fr_auto] gap-4 border border-white/20 p-4">
	<div class="grid min-w-0 grid-cols-[auto_auto_1fr] items-center gap-x-2">
		<span class="text-sm whitespace-nowrap text-gray-400">#{citation.citation_id}</span>
		<span class="font-bold whitespace-nowrap">{citation.author}</span>
		<span class="truncate text-sm text-gray-400">{citation.source}</span>
	</div>
	<span
		class="col-start-2 row-span-2 row-start-1 self-start justify-self-end bg-white/10 px-2 py-0.5 text-xs whitespace-nowrap"
	>
		rizz: {citation.rizz}
	</span>
	<p class="col-start-1 row-start-2 text-white/90">{citation.body}</p>
</div>
