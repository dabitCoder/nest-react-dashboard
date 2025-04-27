import {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { fetchArticles } from "../services/api.ts";
import Spinner from "./Spinner.tsx";
import {  ArticlesResponse } from "../types.ts";

const ArticlesGrid = () => {
  const [articles, setArticles] = useState<ArticlesResponse>({
    data: [],
    total: 0,
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | unknown>(null);

  const fetchData = useCallback(() => {
    startTransition(async () => {
      try {
        const response: ArticlesResponse = await fetchArticles();
        setArticles(response);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(error);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="bg-red-500 text-white mt-5 h-auto rounded-xs p-5">
        There was an error obtaining articles data: {error?.message}
      </div>
    );
  }

  return (
    <section className="mt-6">
      <div className="flex flex-col md:justify-between md:flex-row gap-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          All Articles ({articles.total} in total)
        </h2>
				<input
					type="text"
					placeholder="Search articles..."
					className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
				/>
      </div>
    </section>
  );
};

export default ArticlesGrid;
