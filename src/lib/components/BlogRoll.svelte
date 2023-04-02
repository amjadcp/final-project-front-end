<!--
@component
Display a collection of blog posts is a responsive grid layout.

#### Usage:
```tsx
	<BlogRoll posts={arrayOfPosts} />
```
-->
<script lang="ts">
	import type { Post } from '$lib/types';
	import { ContentTile } from '$lib/components';

	export let posts : Post.BlogPost[];
	
</script>

<div class="blog-roll" data-testid="blog-roll">
	{#each posts as post (post.id)}
		<ContentTile
			ctaLabel="Read article"
			href="/blog/{post.id.toString()}"
			mediaSrc={post.image}
			mediaAlt={"No Image"}
			title={post.title}
			date={post.published_at}
			description={post.description}
		/>
	{:else}
		<p>No blogs found</p>
	{/each}
</div>

<style lang="postcss">
	.blog-roll {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(21.25rem, 1fr));
		gap: var(--space-xl);
	}
</style>
