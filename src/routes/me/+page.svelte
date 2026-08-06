<script lang="ts">
	import { mySecondAge } from "../+page.svelte"
</script>

<div class="min-h-screen bg-black text-white p-6 md:p-8">
	<!-- About Me heading -->
	<h2 class="text-2xl font-bold mb-6 border-b border-white pb-2">About Me</h2>

	<!-- Image and text wrapper with clearfix for float -->
	<!-- Image and text wrapper with clearfix for float -->
	<div class="clearfix mb-8">
		<!-- Profile photo: wrapper handles float & dimensions, image fills it -->
		<div class="float-left mr-6 mb-2 w-64 h-60 shrink-0 overflow-hidden rounded-lg">
			<img
					src="https://gormadatyan.xyz/assets/gor.jpg"
					alt="Gor Madatyan"
					class="w-full h-full object-cover"
			/>
		</div>

		<!-- Placeholder text (larger) -->
		<p class="text-2xl leading-relaxed">
          If you're reading this, you're probably interested in me 🧐. Let me introduce myself. My name is Gor, and I'm a software engineer who enjoys reading both technical and non-technical books in his free time. Nearly {mySecondAge} years have passed since my first "Hello, World!" program. Throughout all this time, I've tried nearly everything—from mobile development to programming microcontrollers. In the era we live in today, I believe this broad exposure has given me many benefits, even if I didn't see it that way while constantly switching between frameworks, languages, and domains. "The most successful form is the simplest one" is a principle I always try to keep in mind. Anyway, I am glad to have diverse and deep experience across many areas, but now I want to go even deeper while documenting my journey along the way. As for my path forward, I want to start contributing to open source in my free time, continue growing as much as I can both as a developer and a person, and look for new job opportunities. Let's see where I end up in the near future (hopefully a good place). You can contact me via the links below; I'm not scary, I promise 👾.
		</p>
	</div>
	<!-- Contacts section -->
	<section aria-labelledby="contacts-heading">
		<h3 id="contacts-heading" class="text-xl font-bold border-b border-white pb-1 mb-4">Contacts</h3>
		<ul class="space-y-2 text-lg">
		    <li><a target="_blank" href="https://github.com/Gor-Madatyan" class="hover:underline">GitHub</a></li>
			<li><a target="_blank" href="https://t.me/gormadatyan09" class="hover:underline">Telegram</a></li>
			<li><a target="_blank" href="https://www.instagram.com/gor_madatyan07/" class="hover:underline">Instagram</a></li>
		</ul>
	</section>
</div>
