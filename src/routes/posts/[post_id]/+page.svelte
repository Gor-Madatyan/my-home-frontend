<script lang="ts">
	interface Post {
		post_id: number;
		title: string;
		summary: string;
		upload_date: string;
		revision_date: string;
		body: string;
		tags: string[];
		likes: number;
	}

	let { data }: { data: { post: Post | null } } = $props();

	function formatDate(dateString: string): string {
		return dateString.split(' ')[0];
	}
</script>

<div class="min-h-screen bg-black text-white p-6 md:p-8">
	{#if data.post}
		<article class="max-w-3xl mx-auto">
			<h1 class="text-3xl font-bold mb-4">{data.post.title}</h1>
			<div class="flex items-center text-sm text-gray-400 mb-6">
				<span>Uploaded: {formatDate(data.post.upload_date)}</span>
				<span class="ml-4">Revised: {formatDate(data.post.revision_date)}</span>
				<span class="ml-4">{data.post.likes} likes</span>
			</div>
			{#if data.post.tags.length}
				<div class="flex flex-wrap gap-2 mb-6">
					{#each data.post.tags as tag (tag)}
						<span class="bg-neutral-700 text-xs px-2 py-1 rounded">{tag}</span>
					{/each}
				</div>
			{/if}
			<p class="text-gray-300 mb-6">{data.post.summary}</p>
			<div class="prose prose-invert max-w-none">
				{data.post.body}
			</div>
		</article>
	{:else}
		<p class="text-center text-gray-500">Post not found.</p>
	{/if}
</div>
