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

export interface ArticleQueryParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: string;
	author?: string;
	searchTerm?: string;
}

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