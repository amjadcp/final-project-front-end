import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

const limit = 40;

// next argument indicates which page to fetch; defaults to 1 for first page
export default async  (page = {next:1, loading: false, error: ""}) => {
	if (page.next===0) return { page, posts: [] };

    storyblokInit({
        accessToken: 'russegF7t28zrFUVxG3K6wtt',
        use: [apiPlugin],
        apiOptions: {
            region: 'us'
        }
    });

    const storyblokApi = useStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories?filter_query[component][in]=updates&page=${page.next}&per_page=6`, { version: 'published' });
    const updates  = response.data.stories;
    
    for(let i=0; i<updates.length; i++){
        updates[i].image = updates[i].content.image.filename
        updates[i].title = updates[i].content.title
    }
	
    if(page.next * response.perPage >= response.total) page.next = 0
    else page.next += 1

	page.loading = false
	 
	return {
		posts: [...updates],
		page: page
	};
}
