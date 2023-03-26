<!--
@component
Home page hero banner.

#### Usage:
```tsx
<HeroBanner {impressiveNumbers} />
```
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatAmount, formatDollar } from '$lib/helpers/formatters';
	import rajagate from '$lib/assets/misc/rajagate.webp';
	import { Button } from '$lib/components';

	export let impressiveNumbers: any;
</script>

<header class="home-hero-banner" data-testid="home-hero-banner" on:dblclick={() => goto('/strategies')}>
	<div class="inner ds-container">
		<img class="media" src={rajagate} alt="Trading Data" />

		<div class="content">
			<h1>
				<!-- ensure line breaks at correct place on larger screens -->
				Department Of Vocational Studies

                                                                                               
			</h1>

			<hr />

			{#if impressiveNumbers}
				<p class="impressive-numbers">
			
					In our college offers BVoc SOFTWARE DEVELOPMENT and BVoc AUTOMOBILE- AUTO ELECTRICALS & ELECTRONICS. Both programs are valuable options for students who are interested in pursuing careers in the IT industry or the automotive industry.
					<!----<a href="/trading-view/trading-pairs">
						{formatAmount(impressiveNumbers.pairs)} trading pairs
					</a>
					providing
					<a href="/trading-view/trading-pairs" style:white-space="nowrap">
						{formatDollar(impressiveNumbers.liquidity)} liquidity
					</a>
					across
					<a href="/trading-view/blockchains" style:white-space="nowrap">
						{impressiveNumbers.blockchains} blockchains
					</a>-->
				</p>
			{/if}

			<div class="buttons">
				<Button href="/trading-view">Explore</Button>
				<Button secondary href="https://tradingstrategy.ai/docs">Read Documentation</Button>
			</div>
		</div>
	</div>
</header>

<style lang="postcss">
	.home-hero-banner {
		background: hsla(var(--hsla-background-accent-1));
		padding: var(--space-xl) 0;
		@media (--viewport-md-up) {
			padding: var(--space-10xl) var(--space-3xl);
		}
	}

	h1 {
		font: var(--f-heading-xxl-medium);
		letter-spacing: var(--f-heading-xxl-spacing, normal);

		@media (--viewport-xl-down) {
			font: var(--f-heading-xl-medium);
			letter-spacing: var(--f-heading-xl-spacing, normal);
		}

		@media (--viewport-sm-down) {
			font: var(--f-heading-lg-medium);
			letter-spacing: var(--f-heading-lg-spacing, normal);
		}

		@media (--viewport-xl-down) {
			& br {
				display: none;
			}
		}
	}

	p {
		font: var(--f-ui-xl-roman);
		letter-spacing: var(--f-ui-xl-spacing, normal);

		& a {
			font: var(--f-ui-xl-bold);
			letter-spacing: var(--f-ui-xl-spacing, normal);
			text-decoration: underline;
		}
	}

	.inner {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(24rem, calc(100vw - 2 * var(--space-xl))), auto));
		gap: min(var(--space-8xl), 10vw);
		place-items: center;
	}

	.buttons {
		display: grid;
		gap: var(--space-ls);
		grid-template-columns: repeat(auto-fit, minmax(12rem, auto));
		/* place-content: center start; */
		margin-top: var(--space-xl);
	}

	hr {
		border: 1px solid hsla(var(--hsl-text));
		margin-block: var(--space-lg);
	}
</style>
