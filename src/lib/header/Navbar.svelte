<script lang="ts">
	import { page } from '$app/stores';
	import { Header, MenuItem } from '$lib/components';
	import Section from '$lib/components/Section.svelte';
	import Search from '$lib/search/Search.svelte';

	$: currentPage = $page.url.pathname;
	// $: showSearch = $page.url.pathname !== '/search';
</script>

<Section header layout="boxed">
	<div class="nav-bar" style:overflow="visible">
		<Header>
			<svelte:fragment slot="menu">
				<!-- <MenuItem label="Trading data" targetUrl="/trading-view" active={currentPage === '/trading-view'} /> -->
				<MenuItem label="Home" targetUrl="https://fcdepofvocation.netlify.app/" target="_blank"/>
				<MenuItem label="About" targetUrl="/" active={currentPage === '/'} />
				<!-- <MenuItem label="About" targetUrl="/about" active={currentPage === '/about'} /> -->
				<!-- <MenuItem label="Community" targetUrl="/community" active={currentPage === '/community'} /> -->
				<MenuItem label="Updates" targetUrl="/updates" active={currentPage === '/updates'} />
				<MenuItem label="Study Material" targetUrl="/study-material" active={currentPage === '/study-material'} />
				<MenuItem label="Achievements" targetUrl="/achievements" active={currentPage === '/achievements'} />
				<MenuItem label="Blog" targetUrl="/blog" active={currentPage === '/blog'} />
			</svelte:fragment>

			<!-- <svelte:fragment slot="search">
				{#if showSearch}<Search />{/if}
			</svelte:fragment> -->
		</Header>
	</div>
</Section>

<style>
	.nav-bar {
		background: hsl(var(--hsl-body));
	}
</style>
