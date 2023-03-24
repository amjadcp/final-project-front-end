<script lang="ts">
	import { formatPriceChange } from '$lib/helpers/formatters';
	import { UpDownCell } from '$lib/components';

	interface MomentumPair {
		name: string
		date: string
		title: string
		file: string
	}

	// Trading pairs to render in this momentum table
	export let pairs: MomentumPair[];
</script>

<div>
	<table>
		<thead>
			<tr>
				<th />
				<th>Name</th>
				<th class="exchange">Title</th>
				<th class="blockchain">Date</th>
				<th class="blockchain">File</th>
			</tr>
		</thead>
		<tbody>
			{#each pairs as pair, idx}
				<tr>
					<td class="position">
						#{idx + 1}
					</td>

					<td class="pair-name">
						<!-- <a href={`/trading-view/${pair.chain_slug}/${pair.exchange_slug}/${pair.pair_slug}`}> -->
							{pair.name}
						<!-- </a> -->
					</td>

					<td class="exchange">
						<!-- <a href={`/trading-view/${pair.chain_slug}/${pair.exchange_slug}`}> -->
							{pair.title}
						<!-- </a> -->
					</td>

					<td class="blockchain">
						<!-- <a href={`/trading-view/${pair.chain_slug}`}> -->
							{pair.date}
						<!-- </a> -->
					</td>

					<td class="blockchain">
						<a href={pair.file} target="_blank">
						Click Here
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	td :global(.up-down-indicator) {
		float: right;
	}

	/* Remove less relevant columns on mobile */
	@media (--viewport-sm-down) {
		:is(.exchange, .blockchain) {
			display: none;
		}
	}
</style>
