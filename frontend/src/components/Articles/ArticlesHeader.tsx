import SearchInput from "../common/SearchInput";
import { Author, SortBy, SortOrder } from "../../types.ts";
import { ChangeEvent, FC } from "react";
import ArticlesFiltersSortBy from "./filters/ArticlesFiltersSortBy.tsx";
import ArticlesFiltersSortOrder from "./filters/ArticlesFiltersSortOrder.tsx";
import ArticlesFiltersItemsPerPage from "./filters/ArticlesFiltersItemsPerPage.tsx";
import ArticlesFiltersAuthors from "./filters/ArticlesFiltersAuthors.tsx";

interface ArticlesHeaderProps {
  totalArticles: number;
  onSearchChange: (searchTerm: string) => void;
  searchTerm: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  handleSortChange: (newSortBy: SortBy) => void;
  handleSortOrderChange: (newSortOrder: SortOrder) => void;
  onPageSizeChange: (newLimit: number) => void;
  currentLimit: number;
  authors: Author[] | undefined;
  onAuthorFilterChange: (newAuthorId: string) => void;
  selectedAuthorId: string;
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
  currentLimit,
  authors,
  onAuthorFilterChange,
  selectedAuthorId,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        All Articles ({totalArticles} in total)
      </h2>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="relative rounded-m">
          <ArticlesFiltersAuthors
            authors={authors}
            onAuthorFilterChange={onAuthorFilterChange}
            selectedAuthorId={selectedAuthorId}
          />
        </div>
        <div className="relative rounded-m">
          <ArticlesFiltersSortBy
            sortBy={sortBy}
            handleSortChange={handleSortChange}
          />
        </div>
        <div className="relative rounded-md ">
          <ArticlesFiltersSortOrder
            sortOrder={sortOrder}
            handleSortOrderChange={handleSortOrderChange}
          />
        </div>
        <div className="relative rounded-md">
          <ArticlesFiltersItemsPerPage
            currentLimit={currentLimit}
            onPageSizeChange={onPageSizeChange}
          />
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
