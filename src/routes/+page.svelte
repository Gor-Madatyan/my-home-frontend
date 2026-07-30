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
	export const userGithub = "Gor-Madatyan"
</script>
<script>
	import {resolve} from "$app/paths";
	import BlogPostCard from '$lib/assets/BlogPostCard.svelte';

	let { data } = $props();
</script>

<div class="flex flex-col md:flex-row min-h-screen bg-black text-white">
	<!-- Main content -->
	<main class="flex-1 p-6 md:p-8">
		<!-- Greeting -->
		<h2 class="text-2xl font-bold mb-6">Hi There! 👋</h2>

		<!-- About Me section -->
		<section aria-labelledby="about-heading" class="mb-16">
			<h3 id="about-heading" class="text-xl font-bold border-b border-white pb-1 mb-4">About Me</h3>
			Welcome to my digital home—I'm glad to have you here! This is where I'll be sharing my thoughts and documenting my journey.

			I’ve always wanted to start a blog, so here we finally are. I plan to write mainly about my explorations into the areas of Computer Science that fascinate me the most, with occasional detours into other topics. You can check out my latest posts in the left sidebar or navigate to different sections of the site. But if you’d like to learn a bit more about me first, keep reading.

			I’m Gor Madatyan, {myAge} years old, single... oh, wrong site, sorry. <a href={resolve("/me")} class="hover:underline text-blue-400">About Me</a>

		</section>

		<!-- Invitation section (no title) -->
		<section class="mb-8">
			Soooo, you can go explore all my posts, <a href={resolve("/posts")} class="hover:underline text-blue-400">Posts</a>, OR
			Go view some citations from different books I liked in some point of my life, <a href={resolve("/citations")} class="hover:underline text-blue-400">Citations</a>
			<br/><br/>
			<a href={resolve("/portfolio")} class="hover:underline text-blue-400">My Portfolio</a>—if you are interested in my projects<br/>
			<a href={resolve("/toolchain")} class="hover:underline text-blue-400">Tools used for this site</a>—if you are curious to know what stack is used for this project

		</section>
	</main>

	<!-- Sidebar with recent posts -->
	<aside
		class="w-full md:w-80 lg:w-96 p-4 bg-neutral-800 border-t md:border-t-0 md:border-l border-white/20"
		aria-label="Recent posts"
	>
		<h3 class="text-lg font-bold mb-4">Recent Posts</h3>
		<ul>
			{#each data.posts as post (post.post_id)}
				<li class="mb-2">
					<a href={resolve(`/posts/${post.post_id}`)} class="block no-underline">
						<BlogPostCard {post} />
					</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>
