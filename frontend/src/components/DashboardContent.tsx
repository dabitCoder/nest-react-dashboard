import Highlights from "../components/Highlights.tsx";
import ArticlesGrid from "../components/Articles/ArticlesGrid.tsx";
import { FC, ReactElement } from "react";
import useArticleQueryParams from "../hooks/useArticlesQueryParams.ts";
import useFetchAuthors from "../hooks/useFetchAuthors.ts";
import useFetchArticles from "../hooks/useFetchArticles.ts";
import ArticlesHeader from "../components/Articles/ArticlesHeader.tsx";
import useArticlesStats from "../hooks/useArticlesStats.ts";

const DashboardContent: FC = (): ReactElement => {
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
    updateAuthor,
    authorId,
  } = useArticleQueryParams();
  const { authors } = useFetchAuthors();
  const { articles, isPending, error } = useFetchArticles(queryParams);
  const { stats, isPending: areStatsPending, error: statsError } = useArticlesStats(queryParams);

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl bg-white">
      <section>
        <Highlights stats={stats} isPending={areStatsPending} error={statsError}/>
      </section>
      <section className="mt-14">
        <ArticlesHeader
          totalArticles={articles.total}
          onSearchChange={updateSearchTerm}
          searchTerm={searchTerm}
          handleSortChange={updateSortBy}
          sortBy={sortBy as "views" | "shares" | ""}
          handleSortOrderChange={updateSortOrder}
          sortOrder={sortOrder as "ASC" | "DESC" | ""}
          onPageSizeChange={updateLimit}
          currentLimit={queryParams.limit || 5}
          authors={authors}
          onAuthorFilterChange={updateAuthor}
          selectedAuthorId={authorId}
        />
        <ArticlesGrid
          isPending={isPending}
          error={error}
          updatePage={updatePage}
          articles={articles}
          page={queryParams.page}
          limit={queryParams.limit}
        />
      </section>
    </main>
  );
};

export default DashboardContent;
