<script lang="ts">
	import { readable } from 'svelte/store';
	import { createTable, createRender } from 'svelte-headless-table';
	import { getChainName } from 'trade-executor-frontend/helpers/chain-explorer';
	import { DataTable } from '$lib/components';
	import BlockchainExplorerLink from './BlockchainExplorerLink.svelte';
	import TransactionStatus from './TransactionStatus.svelte';

	export let transactions: Record<string, any>[] = [];

	const table = createTable(readable(transactions));

	const columns = table.createColumns([
		table.column({
			id: 'chain_id',
			header: 'Chain',
			accessor: ({ chain_id }) => getChainName(chain_id)
		}),
		table.column({
			id: 'transaction_hash',
			header: 'Transaction hash',
			accessor: ({ chain_id, tx_hash }) => ({ chain_id, tx_hash }),
			cell: ({ value }) => createRender(BlockchainExplorerLink, value)
		}),
		table.column({
			id: 'status',
			header: 'Status',
			accessor: ({ status, revert_reason }) => ({ status, revert_reason }),
			cell: ({ value }) => createRender(TransactionStatus, value)
		})
	]);

	const tableViewModel = table.createViewModel(columns);
</script>

<section class="transaction-table">
	<h2>Transactions</h2>
	<DataTable {tableViewModel} />
</section>

<style lang="postcss">
	.transaction-table {
		overflow-x: auto;
		overflow-y: hidden;

		& h2 {
			margin-bottom: var(--space-md);
			font: var(--f-heading-xl-medium);
			letter-spacing: var(--f-heading-xl-spacing, normal);

			@media (--viewport-sm-down) {
				font: var(--f-heading-md-medium);
				letter-spacing: var(--f-heading-md-spacing, normal);
			}
		}
	}

	.transaction-table :global {
		& .status {
			text-align: right;
		}
	}
</style>
