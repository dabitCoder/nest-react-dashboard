import Header from "../Header.tsx";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Header ", () => {
  it("should render without crashing", () => {
    render(<Header />);
    expect(screen.getByRole("heading")).toHaveTextContent("Vitenest");
  });

  it("should match snapshot", () => {
    const container = render(<Header />)
    expect(container).toMatchSnapshot()
  });
});
