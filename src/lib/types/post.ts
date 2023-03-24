export namespace Post {
	export interface UpdatePost {
		description: string;
		excerpt: string;
		image: string;
		id: number;
		published_at: string;
		slug: string;
		title: string;
	}
	export interface StudyMaterial {
		description: string;
		excerpt: string;
		image: string;
		id: number;
		published_at: string;
		slug: string;
		title: string;
	}
	export interface BlogPost {
		description: string;
		excerpt: string;
		feature_image: string;
		feature_image_alt: string;
		id: string;
		published_at: string;
		slug: string;
		title: string;
	}
}
