import {useState, useEffect, useCallback, useTransition} from "react";
import { ArticleQueryParams, ArticlesResponse } from "../types";
import { fetchArticles } from "../services/api";

const useFetchArticles = (queryParams: ArticleQueryParams) => {
	const [articles, setArticles] = useState<ArticlesResponse>({ data: [], total: 0 });
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<Error | null>(null);

	const fetchData = useCallback(async (params: ArticleQueryParams) => {
		try {
			const response: ArticlesResponse = await fetchArticles(params);
			setArticles(response);
			setError(null);
		} catch (err) {
			console.error("Error fetching articles:", err);
			setError(err as Error);
		}
	}, []);

	useEffect(() => {
		startTransition(() => {
			fetchData(queryParams);
		});
	}, [fetchData, queryParams]);

	return { articles, isPending, error };
};

export default useFetchArticles;