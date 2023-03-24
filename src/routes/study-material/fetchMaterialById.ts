import { apiPlugin, storyblokInit, useStoryblokApi, renderRichText } from '@storyblok/svelte';

const limit = 40;

// next argument indicates which page to fetch; defaults to 1 for first page
export default async  (id: number) => {

    storyblokInit({
        accessToken: 'v2rB6bKMWTeD1CaRNCodQwtt',
        use: [apiPlugin],
        apiOptions: {
            region: 'us'
        }
    });

    const storyblokApi = useStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories/${id}`, { version: 'published' });
    const material  = response.data.story;
	 
	return {
        title: material.content.title,
        material: material.content.material.filename,
        details: renderRichText(material.content.details),
        published_at: material.published_at
    }
}
