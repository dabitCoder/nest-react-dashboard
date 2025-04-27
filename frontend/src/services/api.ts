import axios from 'axios'
import {ArticlesResponse} from "../types.ts";

interface ArticleQueryParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: string;
	author?: string;
}

const API_BASE_URL = 'http://localhost:3000';

export const fetchArticles = async (params: ArticleQueryParams = {}): Promise<ArticlesResponse> => {
	try {
		const response = await axios.get(`${API_BASE_URL}/articles`, { params });
		return response.data;
	} catch (error) {
		console.error('Error fetching articles:', error);
		throw error;
	}
};
