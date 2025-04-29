import SearchInput from "../common/SearchInput";
import { SortBy, SortOrder } from "../../types.ts";
import { ChangeEvent, FC } from "react";

interface ArticlesHeaderProps {
  totalArticles: number;
  onSearchChange: (searchTerm: string) => void;
  searchTerm: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  handleSortChange: (newSortBy: SortBy) => void;
  handleSortOrderChange: (newSortOrder: SortOrder) => void;
  onPageSizeChange: (newLimit: number) => void;
  pageSizes: number[];
  currentLimit: number | undefined;
}

const ArticlesHeader: FC<ArticlesHeaderProps> = ({
  totalArticles,
  onSearchChange,
  searchTerm,
  handleSortChange,
  sortBy,
  sortOrder,
  handleSortOrderChange,
  onPageSizeChange,
  pageSizes,
  currentLimit,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    onPageSizeChange(newLimit);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        All Articles ({totalArticles} in total)
      </h2>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="relative rounded-m">
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
        </div>
        <div className="relative rounded-md ">
          <select
            aria-label="sort-order"
            value={sortOrder || ""}
            onChange={(e) =>
              handleSortOrderChange
                ? handleSortOrderChange(e.target.value as "ASC" | "DESC")
                : null
            }
            className="block w-full py-2 pl-3 pr-10 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">Sort Order</option>
            <option value="ASC">Low to High</option>
            <option value="DESC">High to Low</option>
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
        </div>
        <div className="relative rounded-md">
          <select
            aria-label="items-per-page"
            value={currentLimit}
            onChange={handleLimitChange}
            className="block w-full py-2 pl-3 pr-10 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">Items per page</option>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
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
        </div>
        <SearchInput
          handleSearchChange={handleChange}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default ArticlesHeader;
