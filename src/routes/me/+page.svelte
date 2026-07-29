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
		<div class="float-left mr-6 mb-2 w-64 h-48 shrink-0 overflow-hidden rounded-lg">
			<img
					src="/me.png"
					alt="Gor Madatyan"
					class="w-full h-full object-cover"
					width="959"
					height="1280"
			/>
		</div>

		<!-- Placeholder text (larger) -->
		<p class="text-lg leading-relaxed">
			Anyway, as you already know from the home page, My name is Gor and blah blah blah. Here I want to tell you my little story.<br/> My true journey began more than {mySecondAge} years ago. That was when I started asking more questions (mostly to myself) and growing intensely curious about the world—especially programming. Looking back, what surprises me most is that, despite being a pretty hotheaded kid, I managed not to rage-quit during my first year. If you know, you know 😅.

			I spent my very first summer trying to teach myself to write actual code, but with absolutely zero success. After three solid months, I still couldn't write anything beyond a simple "Hello, World!" program; I just wasn't grasping the underlying logic. Writing code != speaking English. It was a brand-new world, even if it was still technically called a "language."

			Eventually, things escalated. Before long, I became the kind of nerd who would fight you if you dared to claim OOP is better than Functional Programming 🤣. Around that time, I also began to understand the true meaning of the word free (as in freedom, not free pizza). Naturally, I became an open-source enthusiast, and I plan to start actively contributing soon.

			But being smart—or at least considering myself to be—isn't about memorizing things like the entire x86_64 instruction set. As the saying goes, The most successful form is the simplest one.

			That's why growing horizontally is just as important as growing vertically. At some point, I started diving into books on a variety of subjects, focusing heavily on life itself and the paths it takes. I've always found it fascinating to study biological evolutionary patterns alongside human-created schools of philosophy, trying to piece together something in between for myself.

			But alright, enough about me. Now you know my story—but do I know yours 👾? Feel free to reach out to me about anything—honestly, anything at all—using the contact info provided on this page.
		</p>
	</div>
	<!-- Contacts section -->
	<section aria-labelledby="contacts-heading">
		<h3 id="contacts-heading" class="text-xl font-bold border-b border-white pb-1 mb-4">Contacts</h3>
		<ul class="space-y-2 text-lg">
			<li><a target="_blank" href="https://t.me/gormadatyan09" class="hover:underline">Telegram</a></li>
			<li><a target="_blank" href="https://www.instagram.com/gor_madatyan07/" class="hover:underline">Instagram</a></li>
			<li><a target="_blank" href="https://github.com/Gor-Madatyan" class="hover:underline">GitHub</a></li>
		</ul>
	</section>
</div>
