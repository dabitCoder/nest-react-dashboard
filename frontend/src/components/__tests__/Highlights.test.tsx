import { render, screen } from "@testing-library/react";
import Highlights from "../Highlights";
import { vitest } from "vitest";
import mockStats from "../../mocks/statsMock.ts";

vitest.mock("./Metrics", () => {
  return ({ article, isPending, colorScheme }: any) => (
    <div data-testid={`metric-${colorScheme}`}>
      {isPending ? "Loading..." : article?.title || "No data"}
    </div>
  );
});

vitest.mock("./common/ErrorMessage", () => {
  return ({ message }: { message: string }) => <div>{message}</div>;
});

describe("Highlights", () => {
  it("should match snapshot", () => {
    const container = render(
      <Highlights error={null} stats={mockStats} isPending={true} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders error message when error is present", () => {
    const error = new Error("Something went wrong");
    render(<Highlights error={error} stats={undefined} isPending={false} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders loading state if isPending is true", () => {
    render(<Highlights error={null} stats={mockStats} isPending={true} />);
    expect(screen.getAllByLabelText("metrics-skeleton")).toHaveLength(2)
    expect(screen.getAllByLabelText("metrics-skeleton")[0]).toBeInTheDocument();
  });

  it("renders metrics when stats are available", () => {
    render(<Highlights error={null} stats={mockStats} isPending={false} />);
    expect(screen.getByText("Highlights")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome user, here's the summary of what's going on"),
    ).toBeInTheDocument();
    expect(screen.getAllByLabelText("metrics-title")[0]).toBeInTheDocument()
  });
});
