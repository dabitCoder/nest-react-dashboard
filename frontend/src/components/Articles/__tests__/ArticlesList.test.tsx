import { render, screen } from "@testing-library/react";
import ArticlesList from "../ArticlesList";
import { Article } from "../../../types.ts";
import { MemoryRouter } from "react-router";
import {mockArticles} from "../../../mocks/articleMock.ts";

type Props = { articles: Article[]; isPending: boolean };

describe("ArticlesList Component", () => {
  const setup = (props: Props) =>
    render(
      <MemoryRouter>
        <ArticlesList {...props} />
      </MemoryRouter>,
    );

  it("should match snapshot when articles has length", () => {
    const container = setup({ isPending: false, articles: mockArticles });
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot when pending = true", () => {
    const container = setup({ articles: [], isPending: true });
    expect(container).toMatchSnapshot();
  });

  it("should render Spinner when isPending is true", () => {
    setup({ articles: [], isPending: true });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it('should render "No articles found." message when articles array is empty and isPending is false', () => {
    setup({ articles: [], isPending: false });
    expect(screen.getByText(/No articles found./i)).toBeInTheDocument();
  });

  it("should render ArticleCard components for each article when articles array is not empty and isPending is false", () => {
    setup({ articles: mockArticles, isPending: false });
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    expect(screen.queryByText(/No articles found./i)).not.toBeInTheDocument();
  });

  it("should pass the correct article prop to each ArticleCard", () => {
    setup({ articles: mockArticles, isPending: false });
    expect(screen.getByLabelText("article-card-title-1")).toHaveTextContent("First Test Article");
    expect(screen.getByLabelText("article-card-title-2")).toHaveTextContent("Second Test Article");
    expect(screen.getByLabelText("article-card-title-3")).toHaveTextContent("A Short Test Article");
  });
});
