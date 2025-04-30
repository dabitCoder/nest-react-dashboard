import { render, screen } from "@testing-library/react";
import Metrics from "../Metrics";
import { Article } from "../../types";
import { Eye } from "lucide-react";

const mockArticle: Article = {
  title: "Most Viewed Article",
  views: 1234,
  author: {
    id: 1,
    name: "Jane Doe",
    createdAt: "2025-04-29",
    updatedAt: "2025-04-29"
  },
  id: 1,
  content: "test",
  shares: 23,
  summary: "test",
  createdAt: "2025-04-29",
  updatedAt: "2025-04-29"
};

describe("Metrics component", () => {
  it("renders skeleton when isPending is true", () => {
    render(<Metrics article={null} isPending={true} icon={<Eye />} />);
    expect(screen.getByLabelText("metrics-skeleton")).toBeInTheDocument();
  });

  it("renders skeleton when article is null", () => {
    render(<Metrics article={null} isPending={false} icon={<Eye />} />);
    expect(screen.getByLabelText("metrics-skeleton")).toBeInTheDocument();
  });

  it("renders article data when provided", () => {
    render(<Metrics article={mockArticle} isPending={false} icon={<Eye />} />);
    expect(screen.getByLabelText("metrics-container")).toBeInTheDocument();
    expect(screen.getByLabelText("metrics-title")).toHaveTextContent(
      "Most Viewed Article",
    );
    expect(screen.getByText("by Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("matches snapshot with article", () => {
    const container = render(
      <Metrics article={mockArticle} isPending={false} icon={<Eye />} />,
    );
    expect(container).toMatchSnapshot();
  });
});
