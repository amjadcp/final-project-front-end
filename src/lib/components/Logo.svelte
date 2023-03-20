<script lang="ts">
	import logo from '$lib/assets/farookcollege-logo.png';
</script>

<div>
	<!-- {@html svg} -->
	<img src={logo} alt="">
</div>

<style>
	div {
		display: contents;
	}
	img {
		width: 80px;
		height: 80px;
	}
	/* div :global(svg) {
		width: var(--logo-width, auto);
		height: var(--logo-height, auto);
	} */

	/* div :global(.logotype) {
		fill: currentColor;
	} */
</style>
