<script lang="ts">
	const SITE_NAME: string = 'Gor Madatyan';
	const DEFAULT_DESCRIPTION: string =
		'The personal blog and portfolio of Gor Madatyan, a software engineer writing about computer science, engineering, and the books he reads.';

	let {
		title,
		titleSuffix = true,
		description = DEFAULT_DESCRIPTION,
		url,
		image,
		imageAlt,
		type = 'website',
		keywords,
		article = false,
		publishedTime,
		modifiedTime,
		jsonLd,
		noindex = false
	}: {
		title: string;
		titleSuffix?: boolean;
		description?: string;
		url: string;
		image?: string;
		imageAlt?: string;
		type?: string;
		keywords?: string | string[];
		article?: boolean;
		publishedTime?: string;
		modifiedTime?: string;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
		noindex?: boolean;
	} = $props();

	const fullTitle: string = $derived(titleSuffix ? `${title} · ${SITE_NAME}` : title);
	const keywordString: string | undefined = $derived(
		Array.isArray(keywords) ? keywords.join(', ') : keywords
	);

	const blocks: Record<string, unknown>[] = $derived(
		Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []
	);
	const jsonBlocks: string = $derived(
		JSON.stringify(blocks.map((o) => ({ '@context': 'https://schema.org', ...o })))
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if keywordString}
		<meta name="keywords" content={keywordString} />
	{/if}
	<link rel="canonical" href={url} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:locale" content="en_US" />
	{#if image}
		<meta property="og:image" content={image} />
		{#if imageAlt}
			<meta property="og:image:alt" content={imageAlt} />
		{/if}
	{/if}

	{#if article}
		<meta property="article:published_time" content={publishedTime} />
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
	{/if}

	<meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}

	{#if jsonBlocks.length}
		<script type="application/ld+json">
{@html jsonBlocks}
		</script>
	{/if}
</svelte:head>
