<script lang="ts">
	import { Icon } from '$lib/components';

	export let name: string;
</script>

<div><Icon {name} /></div>

<style>
	div {
		--size: var(--social-icon-size, 2.5rem);
		display: flex;
		justify-content: center;
		align-items: center;
		height: var(--size);
		width: var(--size);
		border-radius: calc(var(--size) / 2);
		background: hsla(var(--hsl-text));
		color: hsla(var(--hsl-body));
		--icon-size: calc(var(--size) * var(--social-icon-scale, 0.5));
	}

	@media (--viewport-md-up) {
		div {
			--size: var(--social-icon-size, 48px);
		}
	}
</style>
