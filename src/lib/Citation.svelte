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

<div class="border border-white/20 p-4 mb-4 relative">
  <div class="flex items-start justify-between mb-2">
    <div>
      <span class="text-sm text-gray-400">#{citation.citation_id}</span>
      <span class="ml-2 font-bold">{citation.author}</span>
      <span class="ml-2 text-sm text-gray-400">— {citation.source}</span>
    </div>
  </div>
  <p class="text-white/90">{citation.body}</p>
  <span class="absolute top-1 right-1 text-xs bg-white/10 px-2 py-0.5">rizz: {citation.rizz}</span>
</div>
