<!--
	Display chain information and indexing status
-->
<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '$lib/breadcrumb/Breadcrumbs.svelte';
	import { getLogoUrl } from '$lib/helpers/assets';
	import { ContentCard, ContentCardsSection, ContentCardsTemplate, HeroBanner } from '$lib/components';

	export let data: PageData;
</script>

<svelte:head>
	<title>Trading data for blockchains</title>
	<meta name="description" content="Explore trading pairs and exchanges" />
</svelte:head>

<Breadcrumbs labels={{ blockchains: 'Blockchains' }} />

<ContentCardsTemplate pageTitle="DEX trading view" pageDescription="DEX trading view">
	<HeroBanner slot="hero" title="Blockchains" subtitle="List of currently active blockchains producing trading data." />

	<ContentCardsSection cols={4}>
		{#each data.chains as chain}
			<ContentCard ctaFullWidth ctaLabel="Details" href={`/trading-view/${chain.chain_slug}`}>
				<img class="blockchain-logo" slot="icon" alt={`${chain.chain_name} logo`} src={getLogoUrl(chain.chain_slug)} />
				<h3 class="blockchain-title" slot="title">{chain.chain_name}</h3>
				<p>{chain.exchanges} exchanges</p>
			</ContentCard>
		{/each}
	</ContentCardsSection>
</ContentCardsTemplate>

<style lang="postcss">
	.blockchain-logo {
		--size: 3rem;
		height: var(--size);
		width: var(--size);
	}

	h3.blockchain-title {
		font: var(--f-heading-md-medium);
	}
</style>
