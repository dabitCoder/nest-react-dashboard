import React from "react";
import { Article } from "../../types";
import ArticleCard from "./ArticleCard";
import Spinner from "../common/Spinner";

interface ArticlesListProps {
  articles: Article[];
  isPending: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, isPending }) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-6 mb-4 ">
      {isPending ? (
        <Spinner />
      ) : articles.length ? (
        articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default ArticlesList;
