<script lang="ts">
    import BlogPostCard from '$lib/assets/BlogPostCard.svelte';
    import axios from 'axios';
    import {resolve} from "$app/paths";

    interface BlogPost {
        post_id: number;
        title: string;
        summary: string;
        upload_date: string;
        revision_date: string;
        likes: number;
    }

    let { data } = $props();
    let page = $derived(data.page as number);
    let posts = $derived(data.posts as BlogPost[]);
    let hasMore = $derived(posts.length > 0);

    let searchInput = $state('');
    let tagInput = $state('');

    let currentSearch = $state('');
    let currentTags: string[] = $state([]);

    // tag suggestion state
    let tagSuggestions = $state<{tag_name: string; tag_id: number}[]>([]);
    let showSuggestions = $state(false);
    let debounceTimer: ReturnType<typeof setTimeout>;

    async function fetchTagSuggestions(query: string) {
        if (query.length < 2) {
            tagSuggestions = [];
            showSuggestions = false;
            return;
        }
        try {
            const res = await axios.get(`http://localhost:8080/tags?q=${encodeURIComponent(query)}`);
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
        currentTags = tagInput.split(',').map(t => t.trim()).filter(t => t);
        page = 0;
        const result = await fetchPosts(0, currentSearch || undefined, currentTags.length ? currentTags : undefined);
        posts = result.posts;
        hasMore = result.posts.length > 0;
    }

    async function loadMore() {
        const nextPage = page + 1;
        const result = await fetchPosts(nextPage, currentSearch || undefined, currentTags.length ? currentTags : undefined);
        if (result.posts.length === 0) {
            hasMore = false;
        } else {
            posts = [...posts, ...result.posts];
            page = nextPage;
        }
    }

    async function fetchPosts(pageNum: number, search?: string, tags?: string[]) {
        const pageSize = 10;
        let requestUrl = `http://localhost:8080/posts?page_size=${pageSize}&page=${pageNum}`;
        if (search) {
            requestUrl += `&search=${encodeURIComponent(search)}`;
        }
        if (tags) {
            for (const tag of tags) {
                requestUrl += `&tag=${encodeURIComponent(tag)}`;
            }
        }
        try {
            const response = await axios.get(requestUrl);
            const data = response.data;
            const posts = (data.posts || []).map((item: any) => ({
                post_id: item.post_id,
                title: item.title,
                summary: item.summary,
                upload_date: item.upload_date,
                revision_date: item.revision_date,
                likes: item.likes,
            }));
            return { posts, page: pageNum };
        } catch (e) {
            console.error(e);
            return { posts: [], page: pageNum };
        }
    }
</script>

<div class="flex flex-col min-h-screen bg-black text-white p-6 md:p-8">
    <h2 class="text-2xl font-bold mb-6">Posts</h2>

    <!-- search inputs -->
    <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <input
            type="text"
            placeholder="Search posts..."
            bind:value={searchInput}
            class="bg-neutral-800 border border-white/20 px-3 py-2 text-sm text-white focus:outline-none"
        />
        <div class="relative">
            <input
                type="text"
                placeholder="Tags (comma separated)"
                bind:value={tagInput}
                oninput={onTagInput}
                onblur={() => setTimeout(() => closeSuggestions(), 200)}
                class="bg-neutral-800 border border-white/20 px-3 py-2 text-sm text-white focus:outline-none w-full"
            />
            {#if showSuggestions}
                <ul class="absolute z-10 bg-neutral-800 border border-white/20 mt-1 w-full max-h-40 overflow-y-auto text-sm text-white">
                    {#each tagSuggestions as suggestion}
                        <li
                            class="px-3 py-2 cursor-pointer hover:bg-white/10"
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
            class="border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
        >
            Search
        </button>
    </div>

    <!-- Placeholder note -->
    <div class="border border-white/20 p-4 mb-8 text-sm text-gray-400">
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
            class="mt-6 self-center border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
        >
            Load More
        </button>
    {/if}
</div>
