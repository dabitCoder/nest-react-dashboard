import { useParams } from "react-router";
import { ReactElement } from "react";
import useFetchArticle from "../../hooks/useFetchArticle.ts";
import { Eye, Share2 } from "lucide-react";
import SummaryArticleContent from "./SummaryArticleContent.tsx";
import { Skeleton } from "../../components/common/Skeleton.tsx";
import ErrorMessage from "../../components/common/ErrorMessage.tsx";

const SummaryContent = (): ReactElement => {
  const params = useParams();
  const { id } = params;

  const { article, isPending, error } = useFetchArticle(id);
  const paragraphs = article?.content?.split("\n\n");

  if (isPending || !article) {
    return (
      <div
        aria-label="metrics-skeleton"
        className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex grow items-center justify-between p-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
          {article?.title ?? "No title found"}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {article?.author?.name.charAt(0) ?? "No author found"}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">
                {article?.author?.name ?? "No author found"}
              </p>
              <p className="text-sm text-gray-500"></p>
            </div>
          </div>
          <div className="mt-3 sm:mt-0">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">{article?.views ?? 0}</span>
              </div>
              <div className="flex items-center">
                <Share2 className="w-5 h-5 mr-2 text-green-500" />
                <span className="font-medium">{article?.shares ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <SummaryArticleContent
          summary={article?.summary ?? "No summary found"}
        />
      </div>
      <div className="prose prose-lg max-w-none mb-8">
        {paragraphs?.map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="text-sm text-gray-500 mt-6"></div>
    </div>
  );
};

export default SummaryContent;
