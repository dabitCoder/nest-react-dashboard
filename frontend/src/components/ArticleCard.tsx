import { Article } from "../types.ts";
import { FC, ReactNode } from "react";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }): ReactNode => {
  const { id, title, content, author, views, shares } = article;

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex flex-col h-full"
    >
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">by {author}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{content}</p>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-600">
              <span className="text-sm font-medium">{views} views</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span className="text-sm font-medium">{shares} shares</span>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors cursor-pointer">
          <span className="text-sm font-medium">Summarize</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
