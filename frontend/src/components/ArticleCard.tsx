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
      <div className="p-4 flex justify-end gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-100 bg-opacity-50 px-2 py-1 text-xs font-semibold text-emerald-700">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.274 4.057-1.178 8.943-4.968 10.957-3.79-2.014-7.58-4.957-9.542-7z"></path></svg>
          {views}
        </span>
        <span className="inline-flex items-center rounded-full bg-blue-100 bg-opacity-50 px-2 py-1 text-xs font-semibold text-blue-700">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7m14-8v10a7 7 0 01-7 7m0 0l-7-7m7 7V3"></path></svg>
          {shares}
        </span>
      </div>
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">by {author}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{content}</p>
      </div>

      <div className="p-4">
        <button className="w-full flex items-center justify-center bg-blue-400 text-white h-10 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
          <span className="text-sm font-medium">Summarize</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;