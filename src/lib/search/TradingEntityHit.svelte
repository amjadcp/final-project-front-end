<!--
@component
Used for displaying search results; displays a single `$tradingEntity` result
line item; supports basic (top-nav) and advanced (/search page) layouts.

#### Usage:
```tsx
  <TradingEntityHit {document} layout="basic|advanced" />
```
-->
<script lang="ts">
	import type { DocumentSchema } from 'typesense/lib/Typesense/Documents';
	import { formatDollar, formatSwapFee, formatPercent, formatPriceChange } from '$lib/helpers/formatters';
	import { Icon, UpDownCell } from '$lib/components';

	// Any token with less than this liquidity is grayed out in the search results
	const LIQUIDITY_QUALITY_THRESHOLD = 50_000;

	// object returned by Typesense `tradingEntity` search hits; see:
	// https://github.com/tradingstrategy-ai/search/blob/main/docs/trading-entities.md
	export let document: DocumentSchema;
	export let layout: 'basic' | 'advanced';

	const isBasicLayout = layout === 'basic';
	const isAdvancedLayout = layout === 'advanced';
	const hasPriceChange = Number.isFinite(document.price_change_24h);
	const hasValidPrice = document.price_usd_latest > 0;
	const hasTradingData = [document.liquidity, document.volume_24h, document.price_change_24h].some(Number.isFinite);
	const typeLabel = document.type === 'exchange' ? 'DEX' : document.type;

	// flag low quality results
	const hasLiquidityFactor = document.quality_factors?.includes('liquidity');
	const hasLowLiquidity = hasLiquidityFactor && document.liquidity < LIQUIDITY_QUALITY_THRESHOLD;
	const isIncompatibleExchange = document.exchange_type === 'uniswap_v2_incompatible';
	const isLowQuality = hasLowLiquidity || isIncompatibleExchange;

	function getTitle() {
		if (isIncompatibleExchange) return 'Warning: incompatible exchange';
		if (hasLowLiquidity) return 'Warning: low liquidity';
	}
</script>

<li title={getTitle()}>
	<a class="trading-entity-hit tile b {layout}" class:isLowQuality href={document.url_path}>
		<div class="type type-{document.type}">{typeLabel}</div>
		<div class="info">
			<div class="primary">
				<div class="desc truncate lines-2">
					{document.description}
					{#if document.pool_swap_fee}
						<span class="pool-swap-fee">({formatSwapFee(document.pool_swap_fee)})</span>
					{/if}
					{#if isAdvancedLayout && isLowQuality}
						<Icon name="warning" />
					{/if}
				</div>
			</div>

			{#if isAdvancedLayout && hasTradingData}
				<div class="secondary">
					<div class="measures">
						<div class="volume">
							<dt>Volume 24h</dt>
							<dd>{formatDollar(document.volume_24h, 1, 1)}</dd>
						</div>
						<div class="liquidity">
							<dt>Liquidity</dt>
							<dd>{formatDollar(document.liquidity, 1, 1)}</dd>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Basic layout - warning indicator OR price change % -->
		{#if isBasicLayout && isLowQuality}
			<Icon name="warning" size="20px" />
		{:else if isBasicLayout && hasPriceChange}
			<UpDownCell value={document.price_change_24h} formatter={(val) => formatPercent(Math.abs(val))} />
		{/if}

		<!-- Advanced layout - current price & price change % -->
		{#if isAdvancedLayout && (hasPriceChange || hasValidPrice)}
			<UpDownCell value={document.price_change_24h}>
				{#if hasValidPrice}
					<span class="truncate">{formatDollar(document.price_usd_latest)}</span>
				{/if}
				{#if hasPriceChange}
					<span class="truncate">{formatPriceChange(document.price_change_24h)}</span>
				{/if}
			</UpDownCell>
		{/if}
	</a>
</li>

<style lang="postcss">
	.type-exchange {
		background-color: var(--c-wood);
	}

	.type-token {
		background-color: var(--c-parchment-super-dark);
	}

	.type-pair {
		background-color: var(--c-gray-extra-dark);
	}

	li {
		display: grid;
		list-style-type: none;
	}

	.trading-entity-hit {
		display: grid;
		gap: var(--space-md);
		grid-template-columns: auto 1fr auto;
		place-content: center stretch;
		place-items: center stretch;
		border-radius: var(--radius-md);
		outline: none;
		transition: all var(--time-sm) ease-out;

		&.basic {
			padding: var(--space-ms) var(--space-sl);
			border: none;

			@media (--viewport-sm-up) {
				padding-block: var(--space-md);
			}
		}

		&.advanced {
			padding: var(--space-sm) var(--space-sl);

			@media (--viewport-md-up) {
				gap: var(--space-lg);
				padding: var(--space-sl) var(--space-ml);
				border-width: 1px;
				border-color: var(--c-border-2-v1);
			}
		}

		&.isLowQuality {
			opacity: 0.35;
			&:hover {
				background: var(--c-background-2-v1);
			}
		}

		&:hover {
			& :global .up-down-indicator {
				&.bearish {
					background: hsla(var(--hsl-bearish), 0.24) !important;
				}

				&.bullish {
					background: hsla(var(--hsl-bullish), 0.24) !important;
				}
			}
		}

		&:focus {
			background: var(--c-background-4-v1);
			border-color: var(--c-border-2-v1);
		}
	}

	.type {
		display: grid;
		align-content: center;
		border-radius: var(--radius-xxs);
		padding-block: var(--space-xxs);
		width: 3.5rem;
		font: var(--f-ui-sm-medium);
		letter-spacing: var(--f-ui-sm-spacing, normal);
		color: var(--c-parchment);
		text-transform: capitalize;
		text-align: center;

		@media (--viewport-md-up) {
			@nest .advanced & {
				width: 5rem;
				font: var(--f-ui-md-medium);
				letter-spacing: var(--f-ui-md-spacing, normal);
			}
		}
	}

	:global .up-down-indicator {
		max-width: min(30vw, 12rem);
	}

	.info {
		display: grid;
		gap: var(--space-xxs);
		width: 100%;
	}

	.primary,
	.secondary {
		display: grid;
		gap: inherit;
		width: 100%;
	}

	.primary {
		gap: var(--space-ss);
		font: var(--f-ui-md-medium);
		letter-spacing: var(--f-ui-md-spacing, normal);
		--reduced-font-weight: 400;

		@media (--viewport-md-up) {
			@nest .advanced & {
				font: var(--f-ui-lg-medium);
				letter-spacing: var(--f-ui-lg-spacing, normal);
			}
		}

		& .desc {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;

			& :global svg {
				margin: calc(-1 * var(--space-xxs)) 0 0 var(--space-xxs);
			}
		}

		& .pool-swap-fee {
			font-weight: var(--reduced-font-weight);
			opacity: 0.7;
		}
	}

	.secondary {
		gap: 0.625em;
		font: var(--f-ui-sm-roman);
		letter-spacing: var(--f-ui-sm-spacing, normal);

		@media (--viewport-xs) {
			font: var(--f-ui-xs-roman);
			letter-spacing: var(--f-ui-xs-spacing, normal);
		}

		& .measures {
			display: grid;
			gap: var(--space-xs);
			grid-template-columns: repeat(auto-fit, minmax(5rem, auto));
			place-content: start;
			width: 100%;
		}

		& dt {
			display: inline-block;
			font-weight: 400;
			white-space: nowrap;
		}

		& dd {
			display: inline-block;
			margin: 0;
			font-weight: 700;
		}
	}
</style>
