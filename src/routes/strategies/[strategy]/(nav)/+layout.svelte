<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { AlertItem, AlertList, PageHeading } from '$lib/components';
	import StrategyNav from './StrategyNav.svelte';

	export let data: LayoutData;

	$: summary = data.summary;
</script>

<main class="strategy-layout ds-container">
	<PageHeading>
		<h1>{summary.name}</h1>
		<p>{summary.long_description}</p>
	</PageHeading>

	<div class="subpage">
		<StrategyNav strategyId={summary.id} portfolio={data.state.portfolio} currentPath={$page.url.pathname} />
		<slot />
	</div>
	<AlertList status="warning">
		<AlertItem title="Trade execution is currently in beta">
			We are still finishing out the interface. Data and charts might be incorrect.
		</AlertItem>
	</AlertList>
</main>

<style lang="postcss">
	.strategy-layout {
		display: grid;
		gap: var(--space-md);

		& :global(> .alert-list) {
			width: 100%;
			margin-top: var(--space-lg);
		}

		& .page-heading p {
			font: var(--f-ui-md-medium);
		}

		& .subpage :global {
			display: grid;
			gap: var(--space-ls);

			@media (--viewport-lg-up) {
				gap: var(--space-5xl);
				grid-template-columns: 14rem auto;
			}
		}
	}
</style>
