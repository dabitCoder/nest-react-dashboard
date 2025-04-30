import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { ArticleQueryParams, SortBy, SortOrder } from "../types";
import { useDebounce } from "use-debounce";

const initialFetchParams: ArticleQueryParams = {
  page: 1,
  limit: 5,
};

const useArticleQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("searchTerm") ?? "",
  );
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") ?? "",
  );
  const [sortOrder, setSortOrder] = useState<string>(
    searchParams.get("sortOrder") ?? "",
  );
  const [authorId, setAuthorId] = useState<string>(
    searchParams.get("authorId") ?? "",
  );

  const queryParams = useMemo(() => {
    const initialPagination = searchParams.get("page") ?? "1";
    const initialLimit =
      searchParams.get("limit") ?? String(initialFetchParams.limit);

    const newQueryParams: ArticleQueryParams = { ...initialFetchParams };

    if (debouncedSearchTerm) newQueryParams.searchTerm = debouncedSearchTerm;
    if (initialPagination) newQueryParams.page = +initialPagination;
    if (initialLimit) newQueryParams.limit = +initialLimit;
    if (sortBy) newQueryParams.sortBy = sortBy as "views" | "shares";
    if (sortOrder) newQueryParams.sortOrder = sortOrder as "ASC" | "DESC";
    if (authorId) newQueryParams.authorId = authorId;

    return newQueryParams;
  }, [searchParams, debouncedSearchTerm, sortBy, sortOrder, authorId]);

  const updateQueryParams = useCallback(
    (newParams: Partial<ArticleQueryParams>) => {
      const currentParams = new URLSearchParams(searchParams);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) currentParams.set(key, String(value));
        else currentParams.delete(key);
      });
      setSearchParams(currentParams);
    },
    [searchParams, setSearchParams],
  );

  const updateSearchTerm = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, [setSearchTerm]);

  const updateSortBy = useCallback(
    (newSortBy: SortBy) => {
      setSortBy(newSortBy);
      updateQueryParams({ sortBy: newSortBy, page: 1 });
    },
    [updateQueryParams],
  );

  const updateSortOrder = useCallback(
    (newSortOrder: SortOrder) => {
      setSortOrder(newSortOrder);
      updateQueryParams({ sortOrder: newSortOrder, page: 1 });
    },
    [updateQueryParams],
  );

  const updatePage = useCallback(
    (newPage: number) => {
      updateQueryParams({ page: newPage });
    },
    [updateQueryParams],
  );

  const updateLimit = useCallback(
    (newLimit: number) => {
      console.log(newLimit)
      updateQueryParams({ limit: newLimit, page: 1 });
    },
    [updateQueryParams],
  );

  const updateAuthor = useCallback(
    (newAuthorId: string) => {
      setAuthorId(newAuthorId);
      updateQueryParams({ authorId: newAuthorId });
    },
    [updateQueryParams],
  );

  useEffect(() => {
    if (debouncedSearchTerm !== searchParams.get("searchTerm")) {
      const newParams: Partial<ArticleQueryParams> = { searchTerm: debouncedSearchTerm };
      if (debouncedSearchTerm) {
        newParams.page = 1;
      }
      updateQueryParams(newParams);
    }
  }, [debouncedSearchTerm, updateQueryParams, searchParams]);

  return {
    queryParams,
    searchTerm,
    sortBy,
    sortOrder,
    authorId,
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    updatePage,
    updateLimit,
    updateAuthor,
  };
};

export default useArticleQueryParams;