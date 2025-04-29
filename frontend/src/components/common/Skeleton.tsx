import { FC, ReactElement } from "react";
import classNames from "classnames";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className }): ReactElement => (
  <div className={classNames("animate-pulse bg-gray-300 rounded", className)} />
);
