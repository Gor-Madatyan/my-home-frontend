<script lang="ts">
	import { enhance } from '$app/forms';

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

	let { data }: { data: { post: Post | null; isLiked: boolean } } = $props();

	// local state for likes so we can update it without mutating props
	let likes = $state(data.post?.likes ?? 0);
	let liked = $state(data.isLiked ?? false);

	function formatDate(dateString: string): string {
		return dateString.split(' ')[0];
	}

	// optimistic UI update before form submission
	function optimisticLike() {
		liked = !liked;
		likes = liked ? likes + 1 : likes - 1;
	}
</script>

<div class="min-h-screen bg-black text-white p-6 md:p-8">
	{#if data.post}
		<article class="max-w-3xl mx-auto">
			<h1 class="text-3xl font-bold mb-4">{data.post.title}</h1>
			<div class="flex items-center text-sm text-gray-400 mb-6">
				<span>Uploaded: {formatDate(data.post.upload_date)}</span>
				<span class="ml-4">Revised: {formatDate(data.post.revision_date)}</span>
				<form
					method="POST"
					action="?/toggleLike"
					use:enhance
					onsubmit={() => optimisticLike()}
					class="ml-auto"
				>
					<input type="hidden" name="postId" value={data.post?.post_id} />
					<button
						type="submit"
						class="flex items-center gap-2 rounded-md border border-gray-500/50 bg-neutral-800 px-3 py-1.5 text-base hover:bg-gray-700 active:scale-95 hover:text-red-400 transition-colors"
						aria-label="Like post"
					>
						{#if liked}
							❤️
						{:else}
							🤍
						{/if}
						<span>{likes}</span>
					</button>
				</form>
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
