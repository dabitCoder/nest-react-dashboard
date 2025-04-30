import Metrics from "./Metrics.tsx";
import { FC, memo } from "react";
import ErrorMessage from "./common/ErrorMessage.tsx";
import { Eye, Share2 } from "lucide-react";
import { StatsResponse } from "../types.ts";

interface Props {
  error: Error | null;
  stats: StatsResponse | undefined;
  isPending: boolean;
}

const Highlights: FC<Props> = ({ error, stats, isPending }) => {
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <section className="mx-auto">
      <h1 className="text-bold text-xl font-bold">Highlights</h1>
      <span>Welcome user, here's the summary of what's going on</span>
      <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Metrics
          aria-label={"most-viewed"}
          article={stats?.mostViewed?.[0] ?? null}
          isPending={isPending}
          colorScheme="blue"
          icon={<Eye className="h-4 w-4" />}
        />
        <Metrics
          aria-label={"most-shared"}
          article={stats?.mostShared?.[0] ?? null}
          isPending={isPending}
          colorScheme="green"
          icon={<Share2 className="h-4 w-4" />}
        />
      </div>
    </section>
  );
};

export default memo(Highlights);
