<script lang="ts">
    interface Citation {
        citation_id: number;
        author: string;
        rizz: number;
        source: string;
        body: string;
    }

    let {citation}: { citation: Citation } = $props();
</script>

<div class="border border-white/20 p-4 grid grid-cols-[1fr_auto] gap-4">
    <div class="grid grid-cols-[auto_auto_1fr] gap-x-2 items-center min-w-0">
        <span class="text-sm text-gray-400 whitespace-nowrap">#{citation.citation_id}</span>
        <span class="font-bold whitespace-nowrap">{citation.author}</span>
        <span class="text-sm text-gray-400 truncate">{citation.source}</span>
    </div>
    <span class="col-start-2 row-start-1 row-span-2 self-start justify-self-end text-xs bg-white/10 px-2 py-0.5 whitespace-nowrap">
    rizz: {citation.rizz}
  </span>
    <p class="col-start-1 row-start-2 text-white/90">{citation.body}</p>
</div>