import { FC, ReactElement } from "react";
import { Skeleton } from "./common/Skeleton";
import { Article } from "../types.ts";

interface Props {
  article: Article | null;
  isPending: boolean;
  colorScheme?: "blue" | "green";
  icon: ReactElement;
}

const colors = {
  blue: {
    border: "border-blue-100",
    gradient: "from-blue-50 to-indigo-50",
    title: "text-blue-800",
    subtext: "text-blue-500",
    hoverBorder: "hover:border-blue-200",
    activeBorder: "active:border-blue-300",
    icon: "text-blue-500",
  },
  green: {
    border: "border-emerald-100",
    gradient: "from-emerald-50 to-teal-50",
    title: "text-emerald-800",
    subtext: "text-emerald-500",
    hoverBorder: "hover:border-emerald-200",
    activeBorder: "active:border-emerald-300",
    icon: "text-emerald-500",
  },
};

const Metrics: FC<Props> = ({
  article,
  isPending,
  colorScheme = "blue",
  icon,
}): ReactElement => {
  const currentColors = colors[colorScheme];

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

  return (
    <div
      aria-label="metrics-container"
      className={`flex flex-col rounded-lg border ${currentColors.border} 
                bg-gradient-to-br ${currentColors.gradient} 
                shadow-sm hover:shadow-md transition-all duration-300
                ${currentColors.hoverBorder} ${currentColors.activeBorder}`}
    >
      <div className="flex grow items-center justify-between p-5">
        <dl>
          <dt aria-label="metrics-title" className={`text-2xl font-bold ${currentColors.title}`}>
            {article.title}
          </dt>
          <dd className={`text-sm font-medium ${currentColors.subtext}`}>
            by {article.author?.name}
          </dd>
        </dl>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${currentColors.icon}`}>
            {icon}
            <span className="text-sm">{article.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
