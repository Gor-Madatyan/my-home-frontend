<script lang="ts">
	import { mySecondAge } from '../+page.svelte';
	import { site_url } from '$lib/utils';
	import Seo from '$lib/Seo.svelte';
</script>

<div class="min-h-screen bg-black p-6 text-white md:p-8">
	<Seo
		title="About Me"
		description="Learn about Gor Madatyan, a software engineer who enjoys reading technical and non-technical books and documenting his journey through computer science."
		url={`${site_url}/me`}
		type="profile"
		image={`${site_url}/assets/gor.jpg`}
		imageAlt="Gor Madatyan"
		jsonLd={[
			{
				'@type': 'Person',
				name: 'Gor Madatyan',
				url: site_url,
				image: `${site_url}/assets/gor.jpg`,
				jobTitle: 'Software Engineer',
				sameAs: [
					'https://github.com/Gor-Madatyan',
					'https://t.me/gormadatyan09',
					'https://www.instagram.com/gor_madatyan07/'
				]
			}
		]}
	/>
	<!-- About Me heading -->
	<h2 class="mb-6 border-b border-white pb-2 text-2xl font-bold">About Me</h2>

	<!-- Image and text wrapper with clearfix for float -->
	<!-- Image and text wrapper with clearfix for float -->
	<div class="clearfix mb-8">
		<!-- Profile photo: wrapper handles float & dimensions, image fills it -->
		<div class="float-left mr-6 mb-2 h-60 w-64 shrink-0 overflow-hidden rounded-lg">
			<img
				src="https://gormadatyan.xyz/assets/gor.jpg"
				alt="Gor Madatyan"
				class="h-full w-full object-cover"
			/>
		</div>

		<!-- Placeholder text (larger) -->
		<p class="text-2xl leading-relaxed">
			If you're reading this, you're probably interested in me 🧐. Let me introduce myself. My name
			is Gor, and I'm a software engineer who enjoys reading both technical and non-technical books
			in his free time. Nearly {mySecondAge} years have passed since my first "Hello, World!" program.
			Throughout all this time, I've tried nearly everything—from mobile development to programming microcontrollers.
			In the era we live in today, I believe this broad exposure has given me many benefits, even if I
			didn't see it that way while constantly switching between frameworks, languages, and domains. "The
			most successful form is the simplest one" is a principle I always try to keep in mind. Anyway, I
			am glad to have diverse and deep experience across many areas, but now I want to go even deeper
			while documenting my journey along the way. As for my path forward, I want to start contributing
			to open source in my free time, continue growing as much as I can both as a developer and a person,
			and look for new job opportunities. Let's see where I end up in the near future (hopefully a good
			place). You can contact me via the links below; I'm not scary, I promise 👾.
		</p>
	</div>
	<!-- Contacts section -->
	<section aria-labelledby="contacts-heading">
		<h3 id="contacts-heading" class="mb-4 border-b border-white pb-1 text-xl font-bold">
			Contacts
		</h3>
		<ul class="space-y-2 text-lg">
			<li>
				<a target="_blank" href="https://github.com/Gor-Madatyan" class="hover:underline">GitHub</a>
			</li>
			<li>
				<a target="_blank" href="https://t.me/gormadatyan09" class="hover:underline">Telegram</a>
			</li>
			<li>
				<a target="_blank" href="https://www.instagram.com/gor_madatyan07/" class="hover:underline"
					>Instagram</a
				>
			</li>
		</ul>
	</section>
</div>
