<!--
	Daily winners and losers pages
-->
<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '$lib/breadcrumb/Breadcrumbs.svelte';
	import { HeroBanner, Section, AchievementsTable } from '$lib/components';
	import fetchAchievements from './fetchAchievements';
	import Spinner from 'svelte-spinner';
	import OptInBanner from '$lib/newsletter/OptInBanner.svelte';
	import { inview } from 'svelte-inview';

	export let data: PageData;

	let { posts, page } = data;

	const fetchNextPage =async()=> {
		page.loading = true
		try {
			const response = await fetchAchievements(page);
			posts = [...posts, ...response.posts];
			page = response.page;
		} catch (e) {
			page.error = e.message;
			page.loading = false;
		}
	}
    
</script>

<!-- <svelte:head>
	<title>DEX tokens with the highest daily {up ? 'profit' : 'losses'}</title>
	<meta name="description" content="Trading pairs with most {up ? 'profit' : 'volatile losses'} for the last 24h" />
</svelte:head> -->

<!-- <Breadcrumbs labels={{ 'top-list': 'Top lists', 'daily-up': 'Daily gainers', 'daily-down': 'Daily losers' }} /> -->

<main>
	<Section header layout="boxed">
		<HeroBanner contentFullWidth title="Achivements">
			<!-- <svelte:fragment slot="subtitle">
				sdsdfsdfds
			</svelte:fragment> -->
		</HeroBanner>
	</Section>

	<Section layout="boxed">
		<AchievementsTable pairs={posts} />
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

<style>
	main {
		display: grid;
		gap: var(--space-xl);
	}
</style>
