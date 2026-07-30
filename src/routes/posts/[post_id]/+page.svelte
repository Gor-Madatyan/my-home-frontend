<script lang="ts">
	import axios from 'axios';

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

	// local state for likes so we can update it without mutating props
	let likes = $state(data.post?.likes ?? 0);

	function formatDate(dateString: string): string {
		return dateString.split(' ')[0];
	}

	async function handleLike() {
		if (!data.post) return;
		try {
			await axios.put(`http://localhost:8080/posts/${data.post.post_id}/like`);
			likes += 1;
		} catch (e) {
			console.error('Failed to like post:', e);
		}
	}
</script>

<div class="min-h-screen bg-black text-white p-6 md:p-8">
	{#if data.post}
		<article class="max-w-3xl mx-auto">
			<h1 class="text-3xl font-bold mb-4">{data.post.title}</h1>
			<div class="flex items-center text-sm text-gray-400 mb-6">
				<span>Uploaded: {formatDate(data.post.upload_date)}</span>
				<span class="ml-4">Revised: {formatDate(data.post.revision_date)}</span>
				<button
					class="ml-auto flex items-center gap-2 rounded-md border border-gray-500/50 bg-neutral-800 px-3 py-1.5 text-base hover:bg-gray-700 active:scale-95 hover:text-red-400 transition-colors"
					onclick={handleLike}
				>
					❤️
					<span>{likes}</span>
				</button>
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
