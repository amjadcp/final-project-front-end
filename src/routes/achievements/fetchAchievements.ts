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
    const response = await storyblokApi.get(`cdn/stories?filter_query[component][in]=achievements&page=${page.next}&per_page=6`, { version: 'published' });
    const achievements  = response.data.stories;
    
    for(let i=0; i<achievements.length; i++){
        achievements[i].file = achievements[i].content.file.filename
        achievements[i].title = achievements[i].content.title
        achievements[i].date = achievements[i].content.date
        achievements[i].name = achievements[i].content.name
    }

    if(page.next * response.perPage >= response.total) page.next = 0
    else page.next += 1

	page.loading = false
	
    return{
        posts: [...achievements],
        page: page
    };
}
