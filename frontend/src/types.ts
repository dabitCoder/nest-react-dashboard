export interface Article {
	id: number;
	title: string;
	author: string;
	content: string;
	views: number;
	shares: number;
	createdAt: string;
	updatedAt: string;
}

export interface ArticlesResponse {
	data: Article[];
	total: number;
}