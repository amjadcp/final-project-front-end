<script lang="ts">
	import type { PageData } from './$types';
	import fetchPosts from './fetchPosts';
	import { inview } from 'svelte-inview';
	import Spinner from 'svelte-spinner';
	import { BlogRoll, HeroBanner, Section } from '$lib/components';
	import OptInBanner from '$lib/newsletter/OptInBanner.svelte';
	import SocialLinks from './SocialLinks.svelte';
	import heroImage from '$lib/assets/illustrations/newspaper-1.svg?raw';

	export let data: PageData;

	let { posts, page } = data;

	async function fetchNextPage() {
		page.loading = true;
		try {
			const response = await fetchPosts(page);
			posts = [...posts, ...response.posts];
			page = response.page;
		} catch (e) {
			page.error = e.message;
			page.loading = false;
		}
	}
</script>

<svelte:head>
	<title> Blog</title>
	<title> Blog</title>
	<meta name="description" content="Insights and research on DeFi and algorithmic trading." />
</svelte:head>

<main class="blog-index-page">
	<Section class="hero" header layout="boxed">
		<HeroBanner
			title="Blog"
			subtitle="Read our insights , We  are introduce something new............................."
			
			image={heroImage}
			hr={true}
		>
			
		</HeroBanner>
	</Section>

	<!---<Section class="posts" layout="boxed" padding="md">
	<Section class="posts" layout="boxed" padding="md">
		<BlogRoll {posts} />
	</Section>--->
	<Section class="blog" layout="boxed">
		<div class="row">
			<div class="col-md-6">
			  <div class="card" style="width: 18rem;">
				<img src="..." class="card-img-top" alt="...">
				<div class="card-body">
				  <h5 class="card-title">Card title 1</h5>
				  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				  <a href="#" class="btn btn-primary">Go somewhere</a>
				</div>
			  </div>
			</div>
			<div class="col-md-6">
			  <div class="card" style="width: 18rem;">
				<img src="..." class="card-img-top" alt="...">
				<div class="card-body">
				  <h5 class="card-title">Card title 2</h5>
				  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				  <a href="#" class="btn btn-primary">Go somewhere</a>
				</div>
			  </div>
			</div>
		  </div>
		  
	</Section>

	<Section class="loading" layout="boxed">
		{#if page.loading}
			<Spinner />
		{:else if page.error}
			Error loading blog posts:
			<pre class="font-weight-normal">{page.error}</pre>
		{:else if page.next}
			<div use:inview={{ rootMargin: '500px' }} on:enter={fetchNextPage} />
		{:else}
			<OptInBanner>
				<h2 slot="title">Congratulations – you've reached the end 🎉!</h2>
				<p slot="description">
					Want more? Subscribe to our newsletter and get fresh posts directly to your email inbox!
				</p>
			</OptInBanner>
		{/if}
	</Section>
</main>

<style lang="postcss">
	.blog-index-page :global {
		& .hero {
			& .social-links {
				margin-top: var(--space-sm);

				@media (--viewport-sm-down) {
					margin: var(--space-md) 0;
				}
			}

			@media (--viewport-sm-down) {
				& .media {
					display: none;
				}
			}
		}

		& .loading {
			font: var(--f-ui-large-roman);

			& .grid {
				place-items: center;
			}
		}

		& .svelte-spinner {
			height: 4rem;
			width: 4rem;
			& circle {
				stroke: hsla(var(--hsl-text));
			}
		}
	}

	
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.card-img-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-size: 1rem;
  padding: 8px 20px;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}



</style>
