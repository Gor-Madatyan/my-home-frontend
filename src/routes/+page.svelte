<script lang="ts">
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
	const myAge = calculateAge(new Date(2009, 6, 7));
	const mySecondAge = calculateAge(new Date(2021, 6, 7));
</script>

<div class="flex flex-col md:flex-row min-h-screen bg-black text-white">
	<!-- Main content -->
	<main class="flex-1 p-6 md:p-8">
		<!-- Greeting -->
		<h2 class="text-2xl font-bold mb-6">Hi There! 👋</h2>

		<!-- About Me section -->
		<section aria-labelledby="about-heading">
			<h3 id="about-heading" class="text-xl font-bold border-b border-white pb-1 mb-4">About Me</h3>
			Welcome to my digital home—I'm glad to have you here! This is where I'll be sharing my thoughts and documenting my journey.

			I’ve always wanted to start a blog, so here we finally are. I plan to write mainly about my explorations into the areas of Computer Science that fascinate me the most, with occasional detours into other topics. You can check out my latest posts in the left sidebar or navigate to different sections of the site. But if you’d like to learn a bit more about me first, keep reading.

			I’m Gor Madatyan, {myAge} years old, single... oh, wrong site, sorry.

			Anyway, my true journey began more than {mySecondAge} years ago. That was when I started asking more questions (mostly to myself) and growing intensely curious about the world—especially programming. Looking back, what surprises me most is that, despite being a pretty hotheaded kid, I managed not to rage-quit during my first year. If you know, you know 😅.

			I spent my very first summer trying to teach myself to write actual code, but with absolutely zero success. After three solid months, I still couldn't write anything beyond a simple "Hello, World!" program; I just wasn't grasping the underlying logic. Writing code != speaking English. It was a brand-new world, even if it was still technically called a "language."

			Eventually, things escalated. Before long, I became the kind of nerd who would fight you if you dared to claim OOP is better than Functional Programming 🤣. Around that time, I also began to understand the true meaning of the word free (as in freedom, not free pizza). Naturally, I became an open-source enthusiast, and I plan to start actively contributing soon.

			But being smart—or at least considering myself to be—isn't about memorizing things like the entire x86_64 instruction set. As the saying goes, The most successful form is the simplest one.

			That's why growing horizontally is just as important as growing vertically. At some point, I started diving into books on a variety of subjects, focusing heavily on life itself and the paths it takes. I've always found it fascinating to study biological evolutionary patterns alongside human-created schools of philosophy, trying to piece together something in between for myself.

			But alright, enough about me. Now you know my story—but do I know yours 👾? Feel free to reach out to me about anything—honestly, anything at all—using the contact info provided on this page.
		</section>

		<!-- Invitation section (no title) -->
		<section class="mb-8">
			<!-- Placeholder for blog sections list and friendly invitation -->
		</section>
	</main>

	<!-- Sidebar with recent posts -->
	<aside
		class="w-full md:w-64 lg:w-72 p-6 bg-neutral-800 border-t md:border-t-0 md:border-l border-white/20"
		aria-label="Recent posts"
	>
		<h3 class="text-lg font-bold mb-4">Recent Posts</h3>
		<ul>
			<!-- Placeholder list items for future entries -->
			<li class="mb-2"><a href="#placeholder" class="hover:underline">Post Title One</a></li>
			<li class="mb-2"><a href="#placeholder" class="hover:underline">Post Title Two</a></li>
			<li class="mb-2"><a href="#placeholder" class="hover:underline">Post Title Three</a></li>
		</ul>
	</aside>
</div>
