<script lang="ts">
    import {enhance} from "$app/forms";
    import {Marked} from 'marked';
    import {markedHighlight} from 'marked-highlight';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github-dark.css';

    const marked = new Marked(
        markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, {language}).value;
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

    let {data}: { data: { post: Post | null; isLiked: boolean } } = $props();

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
                    <input type="hidden" name="postId" value={data.post?.post_id}/>
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
            <div class="prose prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none">

                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html renderedBody}

            </div>
        </article>
    {:else}
        <p class="text-center text-gray-500">Post not found.</p>
    {/if}
</div>