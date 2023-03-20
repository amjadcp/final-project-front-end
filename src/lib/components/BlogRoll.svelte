<!--
@component
Display a collection of blog posts is a responsive grid layout.

#### Usage:
```tsx
	<BlogRoll posts={arrayOfPosts} />
```
-->
<script lang="ts">
	import type { Blog } from '$lib/types';
	import { ContentTile } from '$lib/components';

	export let posts : Blog.BlogPost[];
	
</script>

<div class="blog-roll" data-testid="blog-roll">
	{#each posts as post (post.id)}
		<ContentTile
			ctaLabel="Read article"
			href="/blog/{post.slug}"
			mediaSrc={post.image}
			mediaAlt={post.image}
			title={post.title}
			date={post.published_at}
			description={post.description}
		/>
	{:else}
		<p>No updates found</p>
	{/each}
</div>

<style lang="postcss">
	.blog-roll {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(21.25rem, 1fr));
		gap: var(--space-xl);
	}
</style>
