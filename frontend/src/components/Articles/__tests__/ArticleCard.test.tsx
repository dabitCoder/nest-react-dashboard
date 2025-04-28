import { render, screen } from "@testing-library/react";
import ArticleCard from "../ArticleCard";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { vitest } from "vitest";
import { mockArticles } from "../../../mocks/articleMock.ts";

const mockNavigate = vitest.fn();

vitest.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ArticleCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticles[0]} />
      </MemoryRouter>,
    );

  it('should match snapshot', () => {
    const container = setup()
    expect(container).toMatchSnapshot()
  })

  it("should render the article title", () => {
    setup();
    expect(
      screen.getByLabelText(`article-card-title-${mockArticles[0].id}`),
    ).toHaveTextContent(mockArticles[0].title);
  });

  it("should render the author", () => {
    setup();
    expect(
      screen.getByText(`by ${mockArticles[0].author}`),
    ).toBeInTheDocument();
  });

  it("should render a short description of the content", () => {
    setup();
    expect(screen.getByText(mockArticles[0].content)).toBeInTheDocument();
  });

  it('should navigate to the summary page when the "Summarize" button is clicked', async () => {
    setup();
    const summarizeButton = screen.getByLabelText("summarize-button");
    await userEvent.click(summarizeButton);
    expect(mockNavigate).toHaveBeenCalledWith(`/${mockArticles[0].id}/summary`);
  });
});
