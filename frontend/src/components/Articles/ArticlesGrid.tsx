import { useCallback, useEffect, useState, useTransition, useRef } from "react";
import {
  ArticleQueryParams,
  ArticlesResponse,
  SortBy,
  SortOrder,
} from "../../types";
import ArticlesHeader from "./ArticlesHeader";
import ArticlesList from "./ArticlesList.tsx";
import { useSearchParams } from "react-router";
import { fetchArticles } from "../../services/api";
import { useDebouncedCallback } from "use-debounce";
import ErrorMessage from "../common/ErrorMessage";
import Pagination from "../common/Pagination";

const initialFetchParams: ArticleQueryParams = {
  page: 1,
  limit: 5,
};

const pageSizes = [5, 10, 20, 50];

const ArticlesGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<ArticlesResponse>({
    data: [],
    total: 0,
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);
  const [queryParams, setQueryParams] =
    useState<ArticleQueryParams>(initialFetchParams);
  const [sortBy, setSortBy] = useState<SortBy>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const totalPages = Math.ceil(articles.total / (queryParams.limit || initialFetchParams.limit));

  useEffect(() => {
    setScrollPosition(window.scrollY);
  }, [queryParams.page, queryParams.limit]);

  useEffect(() => {
    if (!isPending && contentRef.current) {
      window.scrollTo(0, scrollPosition);
    }
  }, [isPending, articles, scrollPosition]);

  useEffect(() => {
    const initialSearchTerm = searchParams.get("searchTerm") ?? "";
    const initialPagination = searchParams.get("page") ?? "1";
    const initialLimit = searchParams.get("limit") ?? String(initialFetchParams.limit);
    const initialSortBy = searchParams.get("sortBy") ?? "";
    const initialSortOrder = searchParams.get("sortOrder") ?? "";

    setSearchTerm(initialSearchTerm);

    const newQueryParams: ArticleQueryParams = { ...initialFetchParams };

    if (initialSearchTerm) {
      newQueryParams.searchTerm = initialSearchTerm;
    }
    if (initialPagination) {
      newQueryParams.page = +initialPagination;
    }
    if (initialLimit) {
      newQueryParams.limit = +initialLimit;
    }

    if (initialSortBy) {
      newQueryParams.sortBy = initialSortBy;
    }

    if (initialSortOrder) {
      newQueryParams.sortOrder = initialSortOrder;
    }

    setQueryParams(newQueryParams);
  }, [searchParams]);

  const fetchData = useCallback((params: ArticleQueryParams) => {
    startTransition(async () => {
      try {
        const response: ArticlesResponse = await fetchArticles(params);
        setArticles(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err as Error);
      }
    });
  }, []);

  useEffect(() => {
    fetchData(queryParams);
  }, [fetchData, queryParams]);

  const updateQueryParams = (newParams: Partial<ArticleQueryParams>) => {
    const currentParams = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, String(value));
      } else {
        currentParams.delete(key);
      }
    });

    setSearchParams(currentParams);

    setQueryParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    debouncedUpdateQueryParams(newSearchTerm);
  };

  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    updateQueryParams({ sortBy: newSortBy, page: 1 });
  };

  const handleSortOrderChange = (newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
    updateQueryParams({ sortOrder: newSortOrder, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage });
  };

  const handlePageSizeChange = (newLimit: number) => {
    updateQueryParams({ limit: newLimit, page: 1 });
  };

  const debouncedUpdateQueryParams = useDebouncedCallback((value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("searchTerm", value);
    } else {
      newParams.delete("searchTerm");
    }
    setSearchParams(newParams);
    setQueryParams({ ...initialFetchParams, searchTerm: value, page: 1 });
  }, 300);

  if (error) {
    return (
      <ErrorMessage
        message={`There was an error obtaining articles data: ${error.message}`}
      />
    );
  }

  return (
    <section className="mt-14" ref={contentRef}>
      <ArticlesHeader
        totalArticles={articles.total}
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        handleSortChange={handleSortChange}
        sortBy={sortBy}
        handleSortOrderChange={handleSortOrderChange}
        sortOrder={sortOrder}
        onPageSizeChange={handlePageSizeChange}
        pageSizes={pageSizes}
        currentLimit={queryParams.limit || initialFetchParams.limit}
      />
      <ArticlesList articles={articles.data} isPending={isPending} />
      {articles.total > 0 && (
        <Pagination
          currentPage={queryParams.page || 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default ArticlesGrid;