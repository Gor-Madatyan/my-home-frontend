<script module lang="ts">
	function calculateAge(birthDate: Date): number {
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		// Subtract one year if birthday hasn't occurred yet this year
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		return age;
	}
	export const myAge = calculateAge(new Date(2009, 6, 7));
	export const mySecondAge = calculateAge(new Date(2021, 6, 7));
	export const userGithub = 'Gor-Madatyan';
</script>

<script>
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import axios from 'axios';
	import BlogPostCard from '$lib/BlogPostCard.svelte';
	import { get_cached } from '$lib/cache';
	import { CACHE_KEYS } from '$lib/cacheKeys';
	import { api_base_url, site_url } from '$lib/utils';
	import Seo from '$lib/Seo.svelte';

	let { data } = $props();

	interface BlogPost {
		post_id: number;
		title: string;
		summary: string;
		upload_date: string;
		revision_date: string;
		likes: number;
	}

	async function fetchRecentPosts(): Promise<BlogPost[]> {
		const response = await axios.get(`${api_base_url}/posts?page_size=5&page=0`);
		return (response.data.posts || []) as BlogPost[];
	}

	// svelte-ignore state_referenced_locally
	let posts = $state((data.posts as BlogPost[]) ?? []);

	onMount(async () => {
		posts = await get_cached(
			CACHE_KEYS.recent_posts,
			fetchRecentPosts,
			data.posts as BlogPost[],
			(fresh) => {
				posts = fresh;
			}
		);
	});
</script>

<div class="flex min-h-screen flex-col bg-black text-white md:flex-row">
	<Seo
		title="Home"
		description="The personal blog and portfolio of Gor Madatyan — thoughts on computer science, software engineering, and the books he reads."
		url={site_url}
		image={`${site_url}/assets/gor.jpg`}
		imageAlt="Gor Madatyan"
		jsonLd={[
			{
				'@type': 'WebSite',
				name: 'Gor Madatyan',
				url: site_url,
				description: 'The personal blog and portfolio of Gor Madatyan.'
			},
			{
				'@type': 'Person',
				name: 'Gor Madatyan',
				url: site_url,
				image: `${site_url}/assets/gor.jpg`,
				sameAs: [
					'https://github.com/Gor-Madatyan',
					'https://t.me/gormadatyan09',
					'https://www.instagram.com/gor_madatyan07/'
				]
			}
		]}
	/>
	<!-- Main content -->
	<main class="flex-1 p-6 md:p-8">
		<!-- Greeting -->
		<h2 class="mb-6 text-2xl font-bold">Hi There! 👋</h2>

		<!-- About Me section -->
		<section aria-labelledby="about-heading" class="mb-16">
			<h3 id="about-heading" class="mb-4 border-b border-white pb-1 text-xl font-bold">About Me</h3>
			Welcome to my digital home—I'm glad to have you here! This is where I'll be sharing my thoughts
			and documenting my journey. I’ve always wanted to start a blog, so here we finally are. I plan to
			write mainly about my explorations into the areas of Computer Science that fascinate me the most,
			with occasional detours into other topics. You can check out my latest posts in the left sidebar
			or navigate to different sections of the site. But if you’d like to learn a bit more about me first,
			keep reading. I’m Gor Madatyan, {myAge} years old, single... oh, wrong site, sorry.
			<a href={resolve('/me')} class="text-blue-400 hover:underline">About Me</a>
		</section>

		<!-- Invitation section (no title) -->
		<section class="mb-8">
			Soooo, you can go explore all my posts, <a
				href={resolve('/posts')}
				class="text-blue-400 hover:underline">Posts</a
			>, OR Go view some citations from different books I liked in some point of my life,
			<a href={resolve('/citations')} class="text-blue-400 hover:underline">Citations</a>
			<br /><br />
			<a href={resolve('/portfolio')} class="text-blue-400 hover:underline">My Portfolio</a>—if you
			are interested in my projects<br />
			<a href={resolve('/toolchain')} class="text-blue-400 hover:underline"
				>Tools used for this site</a
			>—if you are curious to know what stack is used for this project
		</section>
	</main>

	<!-- Sidebar with recent posts -->
	<aside
		class="w-full border-t border-white/20 bg-neutral-800 p-4 md:w-80 md:border-t-0 md:border-l lg:w-96"
		aria-label="Recent posts"
	>
		<h3 class="mb-4 text-lg font-bold">Recent Posts</h3>
		<ul>
			{#each posts as post (post.post_id)}
				<li class="mb-2">
					<a href={resolve(`/posts/${post.post_id}`)} class="block no-underline">
						<BlogPostCard {post} />
					</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>
