import axios from "axios";
import {
	ArticleQueryParams,
	ArticlesResponse,
	Author, StatsQueryParams,
	StatsResponse,
} from "../types.ts";

const API_BASE_URL = "http://localhost:3000";

export const fetchArticles = async (
  params: ArticleQueryParams = {},
): Promise<ArticlesResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const fetchArticlesStats = async (params: StatsQueryParams = {}): Promise<StatsResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/stats`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const fetchAuthors = async (): Promise<Author[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/authors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
