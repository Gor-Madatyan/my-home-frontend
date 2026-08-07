<script lang="ts">
	import { enhance } from '$app/forms';
	import { Marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { site_url } from '$lib/utils';
	import Seo from '$lib/Seo.svelte';

	const marked = new Marked(
		markedHighlight({
			emptyLangClass: 'hljs',
			langPrefix: 'hljs language-',
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

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

	// 1. FIXED: Changed from $derived to $state. $derived values are read-only
	// and will crash if you try to mutate them for optimistic UI updates.
	// svelte-ignore state_referenced_locally
	let likes = $state(data.post?.likes ?? 0);
	// svelte-ignore state_referenced_locally
	let liked = $state(data.isLiked ?? false);

	// Keep local state in sync when data changes from the server or page navigations
	$effect(() => {
		likes = data.post?.likes ?? 0;
		liked = data.isLiked ?? false;
	});

	// 2. FIXED: Marked instances require calling .parse() to render Markdown strings.
	let renderedBody = $derived(data.post ? marked.parse(data.post.body) : '');

	function formatDate(dateString: string): string {
		return dateString.split(' ')[0];
	}

	function formatISODate(dateString: string): string {
		return dateString.split(' ')[0];
	}

	function optimisticLike() {
		liked = !liked;
		likes = liked ? likes + 1 : likes - 1;
	}
</script>

<div class="min-h-screen bg-black p-6 text-white md:p-8">
	{#if data.post}
		<Seo
			title={data.post.title}
			description={data.post.summary || `Read "${data.post.title}" by Gor Madatyan.`}
			url={data.post.post_id ? `${site_url}/posts/${data.post.post_id}` : site_url}
			type="article"
			article
			publishedTime={formatISODate(data.post.upload_date)}
			modifiedTime={formatISODate(data.post.revision_date)}
			keywords={data.post.tags}
			jsonLd={[
				{
					'@type': 'BlogPosting',
					headline: data.post.title,
					description: data.post.summary,
					url: data.post.post_id ? `${site_url}/posts/${data.post.post_id}` : site_url,
					datePublished: formatISODate(data.post.upload_date),
					dateModified: formatISODate(data.post.revision_date),
					author: {
						'@type': 'Person',
						name: 'Gor Madatyan',
						url: site_url
					},
					publisher: {
						'@type': 'Person',
						name: 'Gor Madatyan',
						url: site_url
					},
					mainEntityOfPage: data.post.post_id ? `${site_url}/posts/${data.post.post_id}` : site_url,
					keywords: data.post.tags.join(', ')
				}
			]}
		/>
		<article class="mx-auto max-w-3xl">
			<h1 class="mb-4 text-3xl font-bold">{data.post.title}</h1>
			<div class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
				<span class="hidden sm:inline">Uploaded: {formatDate(data.post.upload_date)}</span>
				<span>Revised: {formatDate(data.post.revision_date)}</span>

				<!-- 3. FIXED: Moved optimistic UI updates directly inside the use:enhance callback,
                     which is the idiomatic way to handle temporary submission states in SvelteKit. -->
				<form
					method="POST"
					use:enhance={() => {
						optimisticLike();
						return async ({ update }) => {
							await update({ invalidateAll: true });
						};
					}}
					action="?/toggleLike"
					class="ml-auto"
				>
					<!-- 4. FIXED: Removed array brackets around data.post?.post_id -->
					<input type="hidden" name="postId" value={data.post?.post_id} />
					<button
						type="submit"
						class="flex items-center gap-2 rounded-md border border-gray-500/50 bg-neutral-800 px-3 py-1.5 text-base transition-colors hover:bg-gray-700 hover:text-red-400 active:scale-95"
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
				<div class="mb-6 flex flex-wrap gap-2">
					{#each data.post.tags as tag (tag)}
						<span class="rounded bg-neutral-700 px-2 py-1 text-xs">{tag}</span>
					{/each}
				</div>
			{/if}
			<p class="mb-6 text-gray-300">{data.post.summary}</p>
			<div
				class="prose max-w-none prose-invert prose-code:before:content-none prose-code:after:content-none"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html renderedBody}
			</div>
		</article>
	{:else}
		<p class="text-center text-gray-500">Post not found.</p>
	{/if}
</div>
