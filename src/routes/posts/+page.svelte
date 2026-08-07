<script lang="ts">
	import { onMount } from 'svelte';
	import BlogPostCard from '$lib/BlogPostCard.svelte';
	import axios from 'axios';
	import { resolve } from '$app/paths';
	import { get_cached } from '$lib/cache';
	import { CACHE_KEYS } from '$lib/cacheKeys';
	import { site_url } from '$lib/utils';
	import Seo from '$lib/Seo.svelte';

	interface BlogPost {
		post_id: number;
		title: string;
		summary: string;
		upload_date: string;
		revision_date: string;
		likes: number;
	}

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	let page = $state(data.page as number);
	// svelte-ignore state_referenced_locally
	let posts = $state(data.posts as BlogPost[]);
	// svelte-ignore state_referenced_locally
	let hasMore = $state(posts.length > 0);

	onMount(async () => {
		const result = await get_cached(
			CACHE_KEYS.posts_list,
			() => fetchPosts(0),
			{ posts: [], page: 0 },
			(fresh) => {
				posts = fresh.posts;
				hasMore = fresh.posts.length > 0;
				page = fresh.page;
			}
		);
		posts = result.posts;
		hasMore = result.posts.length > 0;
		page = result.page;
	});

	let searchInput = $state('');
	let tagInput = $state('');

	let currentSearch = $state('');
	let currentTags: string[] = $state([]);

	// tag suggestion state
	let tagSuggestions = $state<{ tag_name: string; tag_id: number }[]>([]);
	let showSuggestions = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout>;

	async function fetchTagSuggestions(query: string) {
		if (query.length < 2) {
			tagSuggestions = [];
			showSuggestions = false;
			return;
		}
		try {
			const res = await axios.get(`/api/tags?q=${encodeURIComponent(query)}`);
			tagSuggestions = res.data.tags || [];
			showSuggestions = tagSuggestions.length > 0;
		} catch {
			tagSuggestions = [];
			showSuggestions = false;
		}
	}

	function onTagInput() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			const lastTag = tagInput.split(',').pop()?.trim() || '';
			fetchTagSuggestions(lastTag);
		}, 300);
	}

	function selectSuggestion(tagName: string) {
		const parts = tagInput.split(',');
		parts[parts.length - 1] = tagName;
		tagInput = parts.join(',') + ',';
		showSuggestions = false;
	}

	function closeSuggestions() {
		showSuggestions = false;
	}

	async function search() {
		currentSearch = searchInput;
		currentTags = tagInput
			.split(',')
			.map((t) => t.trim())
			.filter((t) => t);
		page = 0;
		try {
			const result = await fetchPosts(
				0,
				currentSearch || undefined,
				currentTags.length ? currentTags : undefined
			);
			posts = result.posts;
			hasMore = result.posts.length > 0;
		} catch (e) {
			console.error('Posts search failed:', e);
		}
	}

	async function loadMore() {
		const nextPage = page + 1;
		try {
			const result = await fetchPosts(
				nextPage,
				currentSearch || undefined,
				currentTags.length ? currentTags : undefined
			);
			if (result.posts.length === 0) {
				hasMore = false;
			} else {
				posts = [...posts, ...result.posts];
				page = nextPage;
			}
		} catch (e) {
			console.error('Posts load more failed:', e);
		}
	}

	async function fetchPosts(pageNum: number, search?: string, tags?: string[]) {
		const pageSize = 10;
		let requestUrl = `/api/posts?page_size=${pageSize}&page=${pageNum}`;
		if (search) {
			requestUrl += `&search=${encodeURIComponent(search)}`;
		}
		if (tags) {
			for (const tag of tags) {
				requestUrl += `&tag=${encodeURIComponent(tag)}`;
			}
		}
		const response = await axios.get(requestUrl);
		const data = response.data;
		const posts = (data.posts || []).map(
			(item: {
				post_id: number;
				title: string;
				summary: string;
				upload_date: string;
				revision_date: string;
				likes: number;
			}) => ({
				post_id: item.post_id,
				title: item.title,
				summary: item.summary,
				upload_date: item.upload_date,
				revision_date: item.revision_date,
				likes: item.likes
			})
		);
		return { posts, page: pageNum };
	}
</script>

<div class="flex min-h-screen flex-col bg-black p-6 text-white md:p-8">
	<Seo
		title="Posts"
		description="All the blog posts written by Gor Madatyan about computer science, software engineering, and other topics that interest him."
		url={`${site_url}/posts`}
	/>
	<h2 class="mb-6 text-2xl font-bold">Posts 🙉</h2>

	<!-- search inputs -->
	<div class="mb-8 flex flex-col gap-4 sm:flex-row">
		<input
			type="text"
			placeholder="Search posts..."
			bind:value={searchInput}
			class="border border-white/20 bg-neutral-800 px-3 py-2 text-sm text-white focus:outline-none"
		/>
		<div class="relative">
			<input
				type="text"
				placeholder="Tags (comma separated)"
				bind:value={tagInput}
				oninput={onTagInput}
				onblur={() => setTimeout(() => closeSuggestions(), 200)}
				class="w-full border border-white/20 bg-neutral-800 px-3 py-2 text-sm text-white focus:outline-none"
			/>
			{#if showSuggestions}
				<ul
					class="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto border border-white/10 bg-neutral-900 text-sm text-white"
				>
					{#each tagSuggestions as suggestion (suggestion.tag_id)}
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							class="cursor-pointer px-3 py-2 hover:bg-white/10"
							onmousedown={() => selectSuggestion(suggestion.tag_name)}
						>
							{suggestion.tag_name}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<button
			onclick={search}
			class="border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10"
		>
			Search
		</button>
	</div>

	<!-- Placeholder note -->
	<div class="mb-8 border border-white/20 p-4 text-sm text-gray-400">
		Here are some blog posts which I want to store so I can keep them somewhere grouped.
	</div>

	<!-- Posts grid -->
	<div class="grid grid-cols-1 gap-4">
		{#each posts as post (post.post_id)}
			<a href={resolve(`/posts/${post.post_id}`)} class="block no-underline">
				<BlogPostCard {post} />
			</a>
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
