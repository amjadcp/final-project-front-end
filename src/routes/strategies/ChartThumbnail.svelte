<script lang="ts">
	import { scaleLinear, scaleUtc } from 'd3-scale';
	import { extent } from 'd3-array';
	import { formatPercent } from '$lib/helpers/formatters';
	import { determinePriceChangeClass } from '$lib/helpers/price';
	import { addUTCDays, floorUTCDate, roundUTCDate } from '$lib/helpers/date';

	type ChartTick = [Date, number | undefined];

	export let data: ChartTick[] = [];
	export let startDate: Date = addUTCDays(floorUTCDate(new Date()), -90);

	let active: ChartTick;
	let svgEl: SVGElement;

	const width = 500;
	const height = 300;
	const scaleX = scaleUtc([startDate, floorUTCDate(new Date())], [0, width]);
	const scaleY = scaleLinear(getValueRange(), [height, 0]);
	const y0 = scaleY(0);

	const profitClass = determinePriceChangeClass(data.at(-1)?.[1]);

	function getValueRange() {
		const range = extent(data, (tick: ChartTick) => tick[1]);
		return range.every(Number.isFinite) ? range : [0, 0];
	}

	function getPathCommands() {
		const commands = data.map(([date, val], idx) => {
			return `L${scaleX(date)},${scaleY(val)}`;
		});
		commands.unshift(`M0,${y0}`);
		return commands.join(' ');
	}

	function targetPoint({ clientX, clientY }: MouseEvent) {
		const screenPoint = new DOMPointReadOnly(clientX, clientY);
		const svgPoint = screenPoint.matrixTransform(svgEl.getScreenCTM().inverse());
		const date = roundUTCDate(scaleX.invert(svgPoint.x));
		active = data.find(([d]) => d.valueOf() === date.valueOf()) || [date, undefined];
	}

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' }).format(date);
	}
</script>

<div class="chart-thumbnail" on:pointermove={targetPoint} on:pointerdown={targetPoint}>
	<svg
		bind:this={svgEl}
		viewBox="0 0 {width} {height}"
		preserveAspectRatio="none"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#if data.length > 0}
			<path class="data {profitClass}" d={getPathCommands()} />
		{/if}

		<line class="x-axis" x1="0" y1={y0} x2={width} y2={y0} />

		{#if active}
			{@const x = scaleX(active[0])}
			<line class="crosshair" x1={x} y1={-height} x2={x} y2={height * 2} />
		{/if}
	</svg>

	{#if active}
		<dl class="hud">
			<dt>{formatDate(active[0])}</dt>
			<dd class={determinePriceChangeClass(active[1])}>{formatPercent(active[1])}</dd>
		</dl>
	{/if}
</div>

<style lang="postcss">
	.chart-thumbnail {
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-rows: 3rem 1fr 3rem;
		background: var(--c-background-7);
		user-select: none;

		& .hud {
			grid-row: 1;
			margin: 0;
			padding: var(--space-sl) var(--space-md);
			display: flex;
			justify-content: space-between;
			font: var(--f-ui-lg-medium);
			letter-spacing: var(--f-ui-lg-spacing, normal);
			color: var(--c-text-extra-light-night);

			& * {
				margin: 0;
				font: inherit;
				background: var(--c-background-7);
			}
		}

		&:not(:hover) .hud {
			display: none;
		}

		& svg {
			grid-row: 2;
			width: 100%;
			height: 100%;
			overflow: visible;
		}

		& .x-axis {
			stroke: var(--c-text-ultra-light-night);
			stroke-width: 0.5;
		}

		& .crosshair {
			stroke: var(--c-text-ultra-light-night);
			stroke-width: 1;
			stroke-dasharray: 6;
		}

		&:not(:hover) .crosshair {
			display: none;
		}

		& .data {
			stroke: var(--c-text-light-night);
			stroke-width: 3;
			stroke-linejoin: round;

			&.bullish {
				stroke: hsla(var(--hsl-bullish));
			}

			&.bearish {
				stroke: hsla(var(--hsl-bearish));
			}
		}
	}
</style>
