<script lang="ts">
	import type { PageData } from './$types';
	import type { ComponentEvents } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getPairsClient } from '$lib/explorer/pair-client';
	import Breadcrumbs from '$lib/breadcrumb/Breadcrumbs.svelte';
	import ChainHeader from './ChainHeader.svelte';
	import SummaryDataTile from './SummaryDataTile.svelte';
	import BlockInfoTile from './BlockInfoTile.svelte';
	import { AlertItem, AlertList, Tabs, type DataTable } from '$lib/components';
	import ExchangesTable from '$lib/explorer/ExchangesTable.svelte';
	import PairsTable from '$lib/explorer/PairsTable.svelte';
	import { formatAmount } from '$lib/helpers/formatters';

	export let data: PageData;
	const { chain } = data;

	const pairsClient = getPairsClient(fetch);

	let activeTab: string;

	let tableOptions: {
		page: number;
		sort: string;
		direction: 'asc' | 'desc';
	};

	$: updateTableParams($page.url);

	function updateTableParams({ searchParams }: URL) {
		activeTab = searchParams.get('tab') || 'exchanges';
		tableOptions = {
			page: Number(searchParams.get('page')) || 0,
			sort: searchParams.get('sort') || 'volume_30d',
			direction: searchParams.get('direction') === 'asc' ? 'asc' : 'desc'
		};

		if (activeTab === 'pairs') {
			pairsClient.update({ ...tableOptions, chain_slugs: chain.chain_slug });
		}
	}

	function handleTabChange({ detail }: ComponentEvents<Tabs>['change']) {
		goto('?' + new URLSearchParams({ tab: detail.value }), { noScroll: true });
	}

	async function handleDatatableChange({ detail }: ComponentEvents<DataTable>['change']) {
		const params = new URLSearchParams({ tab: activeTab, ...detail.params });
		await goto(`?${params}`, { noScroll: true });
		detail.scrollToTop();
	}
</script>

<svelte:head>
	<title>{chain.chain_name} decentralised exchanges and trading pairs</title>
	<meta name="description" content={`Top ${chain.chain_name} tokens and prices`} />
</svelte:head>

<Breadcrumbs labels={{ [chain.chain_slug]: chain.chain_name }} />

<main>
	<ChainHeader name={chain.chain_name} slug={chain.chain_slug} homepage={chain.homepage} />

	<section class="ds-container summary-data" data-testid="chain-summary">
		<div class="block-info">
			<BlockInfoTile title="Last indexed block" count={chain.end_block} timestamp={chain.last_swap_at} />
			<BlockInfoTile title="First indexed block" count={chain.start_block} timestamp={chain.first_swap_at} />
		</div>

		<SummaryDataTile
			count={chain.exchanges}
			title="Exchanges"
			description="Decentralised exchanges with market data available on Trading Strategy"
			buttonLabel="See exchanges"
			href="?tab=exchanges#exchanges"
		/>

		<SummaryDataTile
			count={chain.pairs}
			title="Tracked trading pairs"
			description="Total trading pairs on Trading Strategy for this blockchain."
			buttonLabel="See trading pairs"
			href="?tab=pairs#pairs"
		/>

		<SummaryDataTile
			count={chain.tracked_pairs}
			title="Active trading pairs"
			description="Trading pairs with market data feeds. Active trading pairs have enough trading activity to have data feeds generated for them."
			buttonLabel="See inclusion criteria"
			href="https://tradingstrategy.ai/docs/programming/market-data/tracking.html"
		/>
	</section>

	<section class="ds-container explorer-wrapper">
		<Tabs items={{ exchanges: 'Exchanges', pairs: 'Trading Pairs' }} selected={activeTab} on:change={handleTabChange}>
			{#if activeTab === 'exchanges'}
				{@const hiddenColumns = ['chain_name']}

				<h2 id="exchanges">
					Showing exchanges on {chain.chain_name} with trading activity in last 30 days.
				</h2>

				{#await data.streamed.exchanges}
					<ExchangesTable loading {hiddenColumns} />
				{:then rows}
					<ExchangesTable {rows} {...tableOptions} {hiddenColumns} on:change={handleDatatableChange} />
				{:catch}
					<AlertList>
						<AlertItem>
							An error occurred loading exchanges. Check the URL parameters for errors and try reloading the page.
						</AlertItem>
					</AlertList>
				{/await}
			{:else if activeTab === 'pairs'}
				<h2 id="pairs">
					Showing {formatAmount($pairsClient.totalRowCount)} indexed trading pairs on {chain.chain_name}.
				</h2>

				{#if !$pairsClient.error}
					<div class="pairs-table">
						<PairsTable {...$pairsClient} on:change={handleDatatableChange} />
					</div>
				{:else}
					<AlertList>
						<AlertItem>
							An error occurred loading trading pairs. Check the URL parameters for errors and try reloading the page.
						</AlertItem>
					</AlertList>
				{/if}
			{/if}
		</Tabs>
	</section>
</main>

<style lang="postcss">
	main {
		--layout-gap: var(--space-lg);

		@media (--viewport-md-down) {
			--layout-gap: var(--space-md);
			--grid-gap: var(--layout-gap);
		}

		display: grid;
		gap: var(--layout-gap);
	}

	.summary-data {
		grid-template-columns: repeat(4, 1fr);
		gap: var(--layout-gap);

		@media (--viewport-md-down) {
			grid-template-columns: 1fr;
		}
	}

	.block-info {
		display: grid;
		gap: var(--space-lg);
		grid-template-rows: 1fr 1fr;

		@media (--viewport-md-down) {
			grid-template-rows: 1fr;
			grid-template-columns: 1fr 1fr;
			gap: var(--space-md);
		}
	}

	.explorer-wrapper {
		margin-top: var(--space-ll);

		& h2 {
			font: var(--f-heading-sm-roman);
			margin-block: var(--space-lg);
		}
	}

	.pairs-table {
		display: grid;
		overflow: auto;
	}
</style>
