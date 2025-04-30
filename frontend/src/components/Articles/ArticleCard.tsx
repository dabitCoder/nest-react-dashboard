import { FC, ReactElement } from "react";
import { Share2, Eye, ChevronRight } from "lucide-react";
import { Article } from "../../types";
import ArticlePendingCard from "./ArticlePendingCard.tsx";
import { useNavigate } from "react-router";

interface Props {
  article: Article;
  isPending: boolean;
}

const ArticleCard: FC<Props> = ({ article, isPending }): ReactElement => {
  const navigate = useNavigate();

  if (isPending) {
    return <ArticlePendingCard />;
  }

  return (
    <article aria-label="article-card" className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-50 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Eye className="h-4 w-4" />
            <span className="text-sm">{article?.views ?? 0} views</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <Share2 className="h-4 w-4" />
            <span className="text-sm">{article?.shares ?? 0} shares</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-6 py-5">
        <div className="space-y-2">
          <h2 aria-label={`article-card-title-${article.id}`} className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
            {article?.title ?? "Title not found"}
          </h2>
          <p className="text-sm text-slate-500">
            By{" "}
            <span className="font-medium text-slate-700">
              {article?.author?.name ?? "No author found"}
            </span>
          </p>
        </div>

        <p className="text-slate-600 line-clamp-2">{article?.content ?? "No content"}</p>
      </div>

      <div className="border-t border-slate-50 px-6 py-4">
        <button
          aria-label="summarize-button"
          onClick={() => navigate(`/${article.id}/summary`)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          Summarize
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;
