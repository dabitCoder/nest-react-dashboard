import { FC, ReactElement, useRef } from "react";
import ErrorMessage from "../common/ErrorMessage";
import Pagination from "../common/Pagination";
import ArticleCard from "./ArticleCard.tsx";
import {Article, ArticlesResponse} from "../../types.ts";

interface Props {
  isPending: boolean;
  error: Error | null;
  updatePage: (page: number) => void;
  articles: ArticlesResponse;
  limit: number | undefined;
  page: number | undefined;
}

const ArticlesGrid: FC<Props> = ({
  isPending,
  updatePage,
  articles,
  limit,
  error,
  page
}): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(articles.total / (limit || 5));

  if (error) {
    return (
      <ErrorMessage
        message={`There was an error obtaining articles data: ${error.message}`}
      />
    );
  }

  return (
    <section className="mt-14" ref={contentRef}>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-6 mb-6">
        {articles.data.length ? (
          articles.data.map((article: Article) => (
            <ArticleCard
              article={article}
              key={article.id}
              isPending={isPending}
            />
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
      {articles.total > 0 && (
        <Pagination
          currentPage={page || 1}
          totalPages={totalPages}
          onPageChange={updatePage}
        />
      )}
    </section>
  );
};

export default ArticlesGrid;
