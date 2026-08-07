<script lang="ts">
	import { site_url } from '$lib/utils';
	import Seo from '$lib/Seo.svelte';
</script>

<div class="min-h-screen bg-black p-6 text-white md:p-8">
	<Seo
		title="Toolchain"
		description="The technology stack behind this website: Axum and SQLx on the backend, Svelte and Tailwind CSS on the frontend."
		url={`${site_url}/toolchain`}
	/>
	<!-- Top section: two icons with a plus between them -->
	<section aria-label="Technology stack" class="mb-12 flex flex-col items-center justify-center">
		<div class="flex items-center gap-8 md:gap-12">
			<!-- Placeholder for backend icon -->
			<img
				src="/svelte-icon-svgrepo-com.svg"
				alt="Frontend framework icon"
				class="h-32 w-32 rounded object-contain md:h-48 md:w-48"
			/>
			<!-- Large plus sign -->
			<span class="text-6xl font-bold text-white md:text-8xl" aria-hidden="true">+</span>
			<!-- Placeholder for frontend icon -->
			<img
				src="/tokio.svg"
				alt="Backend framework icon"
				class="h-32 w-32 rounded object-contain md:h-48 md:w-48"
			/>
		</div>
	</section>

	<!-- Section for descriptive text -->
	<section aria-label="Toolchain description" class="mb-12">
		<p class="text-2xl leading-relaxed md:text-3xl">
			For backend <b>Axum</b> was used, and for frontend - <b>Svelte</b>. Without their comfy
			infrastructure I would not be able to take joy in the action of making this website. As for db
			- sqlite was used. Also though it is a little shameful to confess, but this frontend is
			vibecoded with <b>AIder</b> (I hate doing markup)
		</p>
	</section>

	<!-- Section for links to projects -->
	<section aria-label="Related projects" class="border-t border-white/20 pt-8">
		<h2 class="mb-4 text-2xl font-bold">Projects</h2>
		<ul class="space-y-4 text-lg">
			<li>
				<a
					target="_blank"
					href="https://github.com/tokio-rs/axum"
					class="inline-block border-b border-white text-xl transition-colors hover:border-white/50"
				>
					Axum
				</a>
			</li>
			<li>
				<a
					target="_blank"
					href="https://svelte.dev/"
					class="inline-block border-b border-white text-xl transition-colors hover:border-white/50"
				>
					Svelte
				</a>
			</li>
			<li>
				<a
					target="_blank"
					href="https://github.com/transact-rs/sqlx"
					class="inline-block border-b border-white text-xl transition-colors hover:border-white/50"
				>
					SQLx
				</a>
			</li>
			<li>
				<a
					target="_blank"
					href="https://aider.chat/"
					class="inline-block border-b border-white text-xl transition-colors hover:border-white/50"
				>
					AIder
				</a>
			</li>
		</ul>
	</section>
</div>
