<script lang="ts">
	import type { PageData, PageLoad } from './$types';
	// import fetchPosts from './fetchPosts';
	import fetchMaterial from './fetchMaterial';
	import { inview } from 'svelte-inview';
	import Spinner from 'svelte-spinner';
	import { StudyMaterialRoll, HeroBanner, Section } from '$lib/components';
	import OptInBanner from '$lib/newsletter/OptInBanner.svelte';
	// import SocialLinks from './SocialLinks.svelte';
	import heroImage from '$lib/assets/illustrations/newspaper-1.svg?raw';

	export let data: PageData;

	let { posts, page } = data;
	
	const fetchNextPage =async()=> {
		page.loading = true
		try {
			const response = await fetchMaterial(page);
			posts = [...posts, ...response.posts];
			page = response.page;
		} catch (e) {
			page.error = e.message;
			page.loading = false;
		}
	}
</script>

<svelte:head>
	<title>Study Material</title>
	<meta name="description" content="Insights and research on DeFi and algorithmic trading." />
</svelte:head>

<main class="blog-index-page">
	<Section class="hero" header layout="boxed">
		<HeroBanner
			title="Department Updates"
			subtitle="something................"
			image={heroImage}
			hr={true}
		>
			<!-- <SocialLinks /> -->
		</HeroBanner>
	</Section>

	<Section class="posts" layout="boxed" padding="md">
		<StudyMaterialRoll {posts} />
	</Section>

	<Section class="loading" layout="boxed">
		{#if page.loading}
			<Spinner />
		{:else if page.error}
			Error loading blog posts:
			<pre class="font-weight-normal">{page.error}</pre>
		{:else if page.next}
			<div use:inview={{ rootMargin: '500px' }} on:enter={fetchNextPage} />
		{:else}
			<OptInBanner>
				<h2 slot="title">Congratulations – you've reached the end 🎉!</h2>
				<p slot="description">
					Want more? Subscribe to our newsletter and get fresh posts directly to your email inbox!
				</p>
			</OptInBanner>
		{/if}
	</Section>
</main>

<style lang="postcss">
	.blog-index-page :global {
		& .hero {
			& .social-links {
				margin-top: var(--space-sm);

				@media (--viewport-sm-down) {
					margin: var(--space-md) 0;
				}
			}

			@media (--viewport-sm-down) {
				& .media {
					display: none;
				}
			}
		}

		& .loading {
			font: var(--f-ui-large-roman);

			& .grid {
				place-items: center;
			}
		}

		& .svelte-spinner {
			height: 4rem;
			width: 4rem;
			& circle {
				stroke: hsla(var(--hsl-text));
			}
		}
	}
</style>
