import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import ArticlesFiltersSortBy from "../ArticlesFiltersSortBy";

describe("ArticlesFiltersSortBy", () => {
  const handleSortChange = vi.fn();
  const setup = () =>
    render(<ArticlesFiltersSortBy sortBy={""} handleSortChange={handleSortChange} />);


  it('should match snapshot', () => {
    const container = setup()
    expect(container).toMatchSnapshot()
  })

  it("should render correctly with default values", () => {
    setup();

    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByText("Views")).toBeInTheDocument();
    expect(screen.getByText("Shares")).toBeInTheDocument();
  });

  it("shoudl call handleSortChange correctly when selecting a new option", () => {
    setup();
    const selectElement = screen.getByLabelText("sort-by");

    fireEvent.change(selectElement, { target: { value: "shares" } });

    expect(handleSortChange).toHaveBeenCalledWith("shares");
  });
});
