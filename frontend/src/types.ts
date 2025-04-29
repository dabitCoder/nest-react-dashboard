export interface Article {
	id: number;
	title: string;
	author: Author;
	content: string;
	views: number;
	shares: number;
	createdAt: string;
	updatedAt: string;
}

export interface Author {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}


export interface ArticleQueryParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: string;
	authorId?: string;
	searchTerm?: string;
}

export interface StatsQueryParams {
	authorId?: string;
}

export interface ArticlesResponse {
	data: Article[];
	total: number;
}

export interface StatsResponse {
	mostViewed: Article[] | null;
	mostShared: Article[] | null;
}

export type SortBy = 'views' | 'shares' | ''
export type SortOrder = 'ASC' | 'DESC' | ''