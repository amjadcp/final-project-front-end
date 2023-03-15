<!--
	Trading data splash page renderer
-->
<script lang="ts">
	import type { PageData } from './$types';
	import { formatAmount, formatSizeGigabytes } from '$lib/helpers/formatters';
	import heroImage from '$lib/assets/illustrations/data-cloud-1.svg?raw';
	import { ContentCard, ContentCardsSection, ContentCardsTemplate, HeroBanner } from '$lib/components';

	export let data: PageData;
</script>

<ContentCardsTemplate pageTitle="DEX trading view" pageDescription="DEX trading view">
	<HeroBanner
		slot="hero"
		image={heroImage}
		title="Department Of Vocational Studies"
		subtitle="Explore the courses BVOC SOFTWARE DEVELOPMENT and BVOC AUTOMOBILE ELECTRICAL AND ELECTRONICS "
	/>

	<ContentCardsSection title="Explore">

		<ContentCard icon="exchange" title="BVOC SOFTWARE DEVELOPMENT" ctaLabel="Browse BVocSD" href="/trading-view/exchanges">
			<p>
				Bachelor of Vocational or BVoc Software Development deals with subjects such as programming, software, coding, economic, social analysis, basics of computer, computer networking etc. This course is mainly pursued by candidates who are interested in computer software and want to pursue their career in the IT industry.
			</p>
			{#if data}
				
			{/if}
		</ContentCard>

		<ContentCard icon="search" title="Advanced search" ctaLabel="Search tokens" href="/search">
			<p>
				Search tokens across multiple blockchains and exchanges. Sort and filter by liquidity, volume and/or price
				change.
			</p>
			{#if data}
				<p>Explore tokens using advanced token search.</p>
			{/if}
		</ContentCard>

		<ContentCard
			icon="book"
			title="Documentation"
			ctaLabel="Read documentation"
			href="https://tradingstrategy.ai/docs"
			description="You can read our documentation here"
		/>

		<ContentCard
			icon="python"
			title="Notebooks"
			ctaLabel="Go to notebooks"
			href="https://tradingstrategy.ai/docs/programming/strategy-examples/index.html"
			description="You can download all notes here"
		/>
	</ContentCardsSection>
</ContentCardsTemplate>
