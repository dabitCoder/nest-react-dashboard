import { useCallback, useEffect, useState, useTransition } from "react";
import { StatsResponse } from "../types.ts";
import { fetchArticlesStats } from "../services/api.ts";

const useArticlesStats = () => {
  const [stats, setStats] = useState<StatsResponse>();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response: StatsResponse = await fetchArticlesStats();
      setStats(response);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err as Error);
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      fetchData();
    });
  }, [fetchData]);

  return {
    stats,
    isPending,
    error,
  };
};

export default useArticlesStats;
