import { FC } from "react";
import { SortBy } from "../../../types.ts";

interface Props {
  sortBy: SortBy;
  handleSortChange: (newSortBy: SortBy) => void;
}

const ArticlesFiltersSortBy: FC<Props> = ({ sortBy, handleSortChange }) => (
  <>
    <select
      aria-label="sort-by"
      value={sortBy || ""}
      onChange={(e) =>
        handleSortChange
          ? handleSortChange(e.target.value as "views" | "shares" | "")
          : null
      }
      className="block w-full py-2 pl-3 pr-10 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
    >
      <option value="">Sort by</option>
      <option value="views">Views</option>
      <option value="shares">Shares</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </>
);

export default ArticlesFiltersSortBy;
