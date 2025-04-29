import { useState, useEffect, useCallback, useTransition } from "react";
import { StatsQueryParams, StatsResponse } from "../types";
import { fetchArticlesStats } from "../services/api";

const useArticlesStats = (queryParams: StatsQueryParams) => {
  const [stats, setStats] = useState<StatsResponse>();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (params: StatsQueryParams = {}) => {
    try {
      const response: StatsResponse = await fetchArticlesStats(params);
      setStats(response);
    } catch (err) {
      console.error("Error fetching articles stats:", err);
      setError(err as Error);
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      fetchData(queryParams);
    });
  }, [fetchData, queryParams.authorId]);

  return { stats, isPending, error };
};

export default useArticlesStats;
