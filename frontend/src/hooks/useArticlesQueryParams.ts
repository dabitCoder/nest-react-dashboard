import { useState,  useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import {ArticleQueryParams, SortBy, SortOrder} from "../types";
import { useDebouncedCallback } from "use-debounce";

const initialFetchParams: ArticleQueryParams = {
	page: 1,
	limit: 5,
};

const useArticleQueryParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState<string>(
		searchParams.get("searchTerm") ?? "",
	);
	const [sortBy, setSortBy] = useState<string>(
		searchParams.get("sortBy") ?? "",
	);
	const [sortOrder, setSortOrder] = useState<string>(
		searchParams.get("sortOrder") ?? "",
	);

	const queryParams = useMemo(() => {
		const initialPagination = searchParams.get("page") ?? "1";
		const initialLimit =
			searchParams.get("limit") ?? String(initialFetchParams.limit);

		const newQueryParams: ArticleQueryParams = { ...initialFetchParams };

		if (searchTerm) newQueryParams.searchTerm = searchTerm;
		if (initialPagination) newQueryParams.page = +initialPagination;
		if (initialLimit) newQueryParams.limit = +initialLimit;
		if (sortBy) newQueryParams.sortBy = sortBy as "views" | "shares";
		if (sortOrder) newQueryParams.sortOrder = sortOrder as "ASC" | "DESC";

		return newQueryParams;
	}, [searchParams, searchTerm, sortBy, sortOrder]);

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
	}, []);

	const debouncedUpdateQueryParams = useDebouncedCallback((value: string) => {
		updateQueryParams({ searchTerm: value, page: 1 });
	}, 3000);

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
			updateQueryParams({ limit: newLimit, page: 1 });
		},
		[updateQueryParams],
	);

	return {
		queryParams,
		searchTerm,
		sortBy,
		sortOrder,
		updateSearchTerm,
		debouncedUpdateQueryParams,
		updateSortBy,
		updateSortOrder,
		updatePage,
		updateLimit,
	};
};

export default useArticleQueryParams;