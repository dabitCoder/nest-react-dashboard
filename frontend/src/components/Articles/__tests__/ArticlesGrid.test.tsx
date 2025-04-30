import { render, screen } from "@testing-library/react";
import ArticlesGrid from "../ArticlesGrid";
import { Article } from "../../../types";
import { vitest } from "vitest";
import { MemoryRouter } from "react-router";

vitest.mock(
  "../../../common/ErrorMessage",
  () =>
    ({ message }: { message: string }) => (
      <div data-testid="error-message">{message}</div>
    ),
);

vitest.mock(
  "../../../common/Pagination",
  () =>
    ({ currentPage, totalPages }: any) => (
      <div data-testid="pagination">
        Page {currentPage} of {totalPages}
      </div>
    ),
);

vitest.mock("../../ArticleCard", () => ({ article }: { article: any }) => (
  <div data-testid="article-card">{article.title}</div>
));

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Test Article 1",
    views: 100,
    author: {
      id: 1,
      name: "Jane Doe",
      createdAt: "2025-04-29",
      updatedAt: "2025-04-29",
    },
    summary: "test test test",
    content: "",
    shares: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    title: "Test Article 2",
    views: 200,
    author: {
      id: 1,
      name: "Jane Doe",
      createdAt: "2025-04-29",
      updatedAt: "2025-04-29",
    },
    summary: "test test test",
    content: "",
    shares: 0,
    createdAt: "",
    updatedAt: "",
  },
];

describe("ArticlesGrid", () => {
  const defaultProps = {
    isPending: false,
    error: null,
    updatePage: vitest.fn(),
    articles: {
      total: 2,
      data: mockArticles,
    },
    limit: 1,
    page: 1,
  };

  const component = (
    <MemoryRouter>
      <ArticlesGrid {...defaultProps} />
    </MemoryRouter>
  );

  it("should render a list of articles", () => {
    render(component);
    expect(screen.getAllByLabelText("article-card")).toHaveLength(2);
    expect(screen.getByLabelText("pagination")).toHaveTextContent("Page 1 of 2");
  });

  it("should render pagination when articles exist", () => {
    render(component);
    expect(screen.getByLabelText("pagination")).toBeInTheDocument();
  });

  it("should render an error message when error is present", () => {
    render(
      <MemoryRouter>
        <ArticlesGrid
          {...defaultProps}
          error={new Error("Something went wrong")}
        />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(
        "There was an error obtaining articles data: Something went wrong",
      ),
    ).toBeInTheDocument();
  });

  it("should render 'No articles found' when article list is empty", () => {
    render(
      <MemoryRouter>
        <ArticlesGrid {...defaultProps} articles={{ total: 0, data: [] }} />
      </MemoryRouter>,
    );
    expect(screen.getByText("No articles found.")).toBeInTheDocument();
  });
});
