<script lang="ts">
	interface BlogPost {
		post_id: number;
		title: string;
		summary: string;
		upload_date: string;
		revision_date: string;
		likes: number;
	}

	let { post }: { post: BlogPost } = $props();

	function formatDate(dateString: string): string {
		// The server sends dates as "YYYY-MM-DD HH:MM:SS"
		return dateString.split(' ')[0];
	}
</script>

<div class="mb-4 border border-white/20 bg-neutral-800 p-4">
	<h4 class="mb-1 text-sm font-bold">{post.title}</h4>
	<p class="mb-2 line-clamp-3 text-xs text-gray-400">{post.summary}</p>
	<div class="flex justify-between text-xs text-gray-500">
		<span>Revised: {formatDate(post.revision_date)}</span>
		<span>{post.likes} likes</span>
	</div>
</div>
