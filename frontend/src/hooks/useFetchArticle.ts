import { useState, useEffect, useCallback, useTransition } from "react";
import { Article } from "../types";
import { fetchArticle } from "../services/api";

const useFetchArticle = (id: string | undefined) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (articleId: string) => {
    try {
      const response: Article = await fetchArticle(articleId as string);
      setArticle(response);
      setError(null);
    } catch (err) {
      console.error(`Error fetching article with ID ${articleId}:`, err);
      setError(err as Error);
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      if (id) {
        fetchData(id);
      }
    });
  }, [id, fetchData]);

  return { article, isPending, error };
};

export default useFetchArticle;
