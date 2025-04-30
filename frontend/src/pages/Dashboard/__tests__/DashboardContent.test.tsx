import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import DashboardContent from "../DashboardContent";
import { ArticlesResponse } from "../../../types";
import useFetchArticles from "../../../hooks/useFetchArticles.ts";
import useArticleQueryParams from "../../../hooks/useArticlesQueryParams.ts";
import useFetchAuthors from "../../../hooks/useFetchAuthors.ts";
import useArticlesStats from "../../../hooks/useArticlesStats.ts";
import { mockArticles } from "../../../mocks/articleMock.ts";
import { MemoryRouter } from "react-router";

vi.mock("../../../hooks/useArticlesQueryParams.ts");
vi.mock("../../../hooks/useFetchAuthors.ts");
vi.mock("../../../hooks/useArticlesStats.ts");
vi.mock("../../../hooks/useFetchArticles.ts");

const mockAuthors = [
  { id: 1, name: "Author 1", createdAt: "2025-04-29" },
  { id: 2, name: "Author 2" },
];

const articlesMock: ArticlesResponse = {
  total: 100,
  data: mockArticles,
};

const mockStats = {
  mostViewed: 1000,
  mostShared: 500,
};

const mockQueryParams = {
  page: 1,
  limit: 5,
  searchTerm: "",
  sortBy: "views",
  sortOrder: "ASC",
  authorId: "1",
};

const setupDashboard = (
  articlesReturnValue?: Partial<ReturnType<typeof useFetchArticles>>,
  authorsReturnValue?: Partial<ReturnType<typeof useFetchAuthors>>,
  statsReturnValue?: Partial<ReturnType<typeof useArticlesStats>>,
  queryParamsReturnValue?: Partial<ReturnType<typeof useArticleQueryParams>>,
) => {
  const updateSearchTerm = vi.fn();
  const updateSortBy = vi.fn();
  const updateSortOrder = vi.fn();
  const updatePage = vi.fn();
  const updateLimit = vi.fn();
  const updateAuthor = vi.fn();

  (useArticleQueryParams as jest.Mock).mockReturnValue({
    queryParams: mockQueryParams,
    searchTerm: mockQueryParams.searchTerm,
    sortBy: mockQueryParams.sortBy,
    sortOrder: mockQueryParams.sortOrder,
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    updatePage,
    updateLimit,
    updateAuthor,
    authorId: mockQueryParams.authorId,
    ...queryParamsReturnValue,
  });

  (useFetchAuthors as jest.Mock).mockReturnValue({
    authors: mockAuthors,
    ...authorsReturnValue,
  });

  (useFetchArticles as jest.Mock).mockReturnValue({
    articles: articlesMock,
    isPending: false,
    error: null,
    ...articlesReturnValue,
  });

  (useArticlesStats as jest.Mock).mockReturnValue({
    stats: mockStats,
    isPending: false,
    error: null,
    ...statsReturnValue,
  });

  return {
    renderResult: render(
      <MemoryRouter>
        <DashboardContent />
      </MemoryRouter>,
    ),
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    updatePage,
    updateLimit,
    updateAuthor,
  };
};

describe("DashboardContent Component", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("should call updateSearchTerm when search input changes", () => {
    const { renderResult, updateSearchTerm } = setupDashboard();
    const searchInput = renderResult.getByPlaceholderText("Search articles...");
    fireEvent.change(searchInput, { target: { value: "new search term" } });
    expect(updateSearchTerm).toHaveBeenCalledWith("new search term");
  });

  it("should call updateAuthor when author filter is changed", () => {
    const { renderResult, updateAuthor } = setupDashboard();
    const authorSelect = renderResult.getByLabelText(/author/i);
    fireEvent.change(authorSelect, { target: { value: "2" } });
    expect(updateAuthor).toHaveBeenCalledWith("2");
  });

  it("should handle article fetch error gracefully", () => {
    const { renderResult } = setupDashboard({
      articles: { total: 0, data: [] },
      isPending: false,
      error: new Error("Error fetching articles"),
    });
    expect(
      renderResult.getByText(/Error fetching articles/i),
    ).toBeInTheDocument();
  });

  it.skip("should render a loading state when articles are being fetched", () => {
    const { renderResult } = setupDashboard({ isPending: true, error: null });
    expect(renderResult.getByText(/Loading articles.../i)).toBeInTheDocument();
  });

  it.skip("should render a loading state when stats are being fetched", () => {
    setupDashboard({ isPending: true, error: null });
    expect(screen.getAllByLabelText("metrics-skeleton")).toHaveLength(2);
    expect(screen.getAllByLabelText("metrics-skeleton")[0]).toBeInTheDocument();
  });

  it("should render a message when there are no articles", () => {
    const { renderResult } = setupDashboard({
      articles: { total: 0, data: [] },
      isPending: false,
      error: null,
    });
    expect(renderResult.getByText(/No articles found./i)).toBeInTheDocument();
  });

});
