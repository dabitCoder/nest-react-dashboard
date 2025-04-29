import { Skeleton } from "../common/Skeleton.tsx";
import {FC, ReactElement} from "react";

const ArticlePendingCard: FC = (): ReactElement => (
  <article className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
    <div className="flex items-center justify-between border-b border-slate-50 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>

    <div className="space-y-4 px-6 py-5">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>

    <div className="border-t border-slate-50 px-6 py-4">
      <Skeleton className="h-9 w-28 rounded-lg" />
    </div>
  </article>
);

export default ArticlePendingCard;
