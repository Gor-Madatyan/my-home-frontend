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

<div class="border border-white/20 p-4 mb-4 bg-neutral-800">
	<h4 class="font-bold text-sm mb-1">{post.title}</h4>
	<p class="text-xs text-gray-400 mb-2 line-clamp-3">{post.summary}</p>
	<div class="flex justify-between text-xs text-gray-500">
		<span>Revised: {formatDate(post.revision_date)}</span>
		<span>{post.likes} likes</span>
	</div>
</div>
