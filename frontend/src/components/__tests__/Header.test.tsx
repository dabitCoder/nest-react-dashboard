import Header from "../Header.tsx";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

describe("Header ", () => {
  const component = (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  it("should render without crashing", () => {
    render(component);
    expect(screen.getByRole("heading")).toHaveTextContent("Vitenest");
  });

  it("should match snapshot", () => {
    const container = render(component);
    expect(container).toMatchSnapshot();
  });
});
