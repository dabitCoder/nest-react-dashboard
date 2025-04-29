import { useRef } from "react";
import ArticlesHeader from "./ArticlesHeader";
import ArticlesList from "./ArticlesList.tsx";
import ErrorMessage from "../common/ErrorMessage";
import Pagination from "../common/Pagination";
import useArticleQueryParams from "../../hooks/useArticlesQueryParams";
import useFetchArticles from "../../hooks/useFetchArticles";

const pageSizes = [5, 10, 20, 50];

const ArticlesGrid = () => {
  const {
    queryParams,
    searchTerm,
    sortBy,
    sortOrder,
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    updatePage,
    updateLimit,
  } = useArticleQueryParams();

  const { articles, isPending, error } = useFetchArticles(queryParams);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(articles.total / (queryParams.limit || 5));

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
        onSearchChange={updateSearchTerm}
        searchTerm={searchTerm}
        handleSortChange={updateSortBy}
        sortBy={sortBy as "views" | "shares" | ""}
        handleSortOrderChange={updateSortOrder}
        sortOrder={sortOrder as "ASC" | "DESC" | ""}
        onPageSizeChange={updateLimit}
        pageSizes={pageSizes}
        currentLimit={queryParams.limit || 5}
      />
      <ArticlesList articles={articles.data} isPending={isPending} />
      {articles.total > 0 && (
        <Pagination
          currentPage={queryParams.page || 1}
          totalPages={totalPages}
          onPageChange={updatePage}
        />
      )}
    </section>
  );
};

export default ArticlesGrid;
