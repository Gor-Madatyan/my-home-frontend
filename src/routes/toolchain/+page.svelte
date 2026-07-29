<script lang="ts">
</script>

<div class="min-h-screen bg-black text-white p-6 md:p-8">
	<!-- Top section: two icons with a plus between them -->
	<section aria-label="Technology stack" class="flex flex-col items-center justify-center mb-12">
		<div class="flex items-center gap-8 md:gap-12">
			<!-- Placeholder for backend icon -->
			<img
				src="/svelte-icon-svgrepo-com.svg"
				alt="Frontend framework icon"
				class="w-32 h-32 md:w-48 md:h-48 object-contain rounded"
			/>
			<!-- Large plus sign -->
			<span class="text-6xl md:text-8xl font-bold text-white" aria-hidden="true">+</span>
			<!-- Placeholder for frontend icon -->
			<img
				src="/tokio.svg"
				alt="Backend framework icon"
				class="w-32 h-32 md:w-48 md:h-48 object-contain rounded"
			/>
		</div>
	</section>

	<!-- Section for descriptive text -->
	<section aria-label="Toolchain description" class="mb-12">
		<p class="text-2xl md:text-3xl leading-relaxed">
			For backend <b>Axum</b> was used, and for frontend - <b>Svelte</b>. Without their comfy infrastructure
			I would not be able to take joy in the action of making this website. As for db - sqlite was used.
			Also though it is a little shameful to confess, but this frontend is vibecoded with <b>AIder</b> (I hate doing markup)
		</p>
	</section>

	<!-- Section for links to projects -->
	<section aria-label="Related projects" class="border-t border-white/20 pt-8">
		<h2 class="text-2xl font-bold mb-4">Projects</h2>
		<ul class="space-y-4 text-lg">
			<li>
				<a target="_blank" href="https://github.com/tokio-rs/axum" class="inline-block text-xl border-b border-white hover:border-white/50 transition-colors">
					Axum
				</a>
			</li>
			<li>
				<a target="_blank" href="https://svelte.dev/" class="inline-block border-b text-xl border-white hover:border-white/50 transition-colors">
					Svelte
				</a>
			</li>
			<li>
				<a target="_blank" href="https://github.com/transact-rs/sqlx" class="inline-block text-xl border-b border-white hover:border-white/50 transition-colors">
					SQLx
				</a>
			</li>
			<li>
				<a target="_blank" href="https://aider.chat/" class="inline-block border-b text-xl border-white hover:border-white/50 transition-colors">
					AIder
				</a>
			</li>
		</ul>
	</section>
</div>
