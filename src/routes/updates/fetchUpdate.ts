import { apiPlugin, storyblokInit, useStoryblokApi, renderRichText } from '@storyblok/svelte';

const limit = 40;

// next argument indicates which page to fetch; defaults to 1 for first page
export default async  (id:number) => {
	// if (page.next===0) return { page, posts: [] };

    storyblokInit({
        accessToken: 'russegF7t28zrFUVxG3K6wtt',
        use: [apiPlugin],
        apiOptions: {
            region: 'us'
        }
    });

    const storyblokApi = useStoryblokApi();
    console.log(id);
    
    const response = await storyblokApi.get(`cdn/stories/${id}`, { version: 'published' });
    const update  = response.data.story;
	 
	return {
        title: update.content.title,
        image: update.content.image.filename,
        details: renderRichText(update.content.details),
        published_at: update.published_at
    }
}
