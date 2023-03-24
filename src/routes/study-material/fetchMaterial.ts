import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

const limit = 40;

// next argument indicates which page to fetch; defaults to 1 for first page
export default async  (page = {next:1, loading: false, error: ""}) => {
	if (page.next===0) return { page, posts: [] };

    storyblokInit({
        accessToken: 'v2rB6bKMWTeD1CaRNCodQwtt',
        use: [apiPlugin],
        apiOptions: {
            region: 'us'
        }
    });

    const storyblokApi = useStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories?filter_query[component][in]=study-material&page=${page.next}&per_page=6`, { version: 'published' });
    const material  = response.data.stories;
    
    for(let i=0; i<material.length; i++){
        material[i].material = material[i].content.material.filename
        material[i].title = material[i].content.title
    }
	
    if(page.next * response.perPage >= response.total) page.next = 0
    else page.next += 1

    page.loading = false
	 
	return {
		posts: [...material],
		page: page
	};
}
