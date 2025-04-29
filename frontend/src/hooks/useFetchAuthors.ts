import { useState, useEffect, useCallback, useTransition } from "react";
import { Author } from "../types";
import { fetchAuthors } from "../services/api";

const useFetchAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchAuthors();
      setAuthors(response);
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


  return { authors, isPending, error };
};

export default useFetchAuthors;
