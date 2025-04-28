import { render, screen, fireEvent } from "@testing-library/react";
import ArticlesHeader from "../ArticlesHeader";
import { vitest } from "vitest";
import { SortBy, SortOrder } from "../../../types.ts";

const mockProps = {
  totalArticles: 100,
  onSearchChange: vitest.fn(),
  searchTerm: "",
  sortBy: "views" as SortBy,
  sortOrder: "ASC" as SortOrder,
  handleSortChange: vitest.fn(),
  handleSortOrderChange: vitest.fn(),
  onPageSizeChange: vitest.fn(),
  pageSizes: [10, 20, 50],
  currentLimit: 10,
};

describe("ArticlesHeader Component", () => {
  beforeEach(() => {
    mockProps.onSearchChange.mockClear();
    mockProps.handleSortChange.mockClear();
    mockProps.handleSortOrderChange.mockClear();
    mockProps.onPageSizeChange.mockClear();
  });

  it("should match snapshot", () => {
    const container = render(<ArticlesHeader {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should render the heading with the total number of articles", () => {
    render(<ArticlesHeader {...mockProps} />);
    expect(
      screen.getByText(/All Articles \(100 in total\)/i),
    ).toBeInTheDocument();
  });

  it("should render the Sort By dropdown with options", () => {
    render(<ArticlesHeader {...mockProps} />);
    const sortBySelect = screen.getByRole("combobox", { name: "sort-by"});
    expect(sortBySelect).toBeInTheDocument();
    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByText("Views")).toBeInTheDocument();
    expect(screen.getByText("Shares")).toBeInTheDocument();
  });

  it("should call handleSortChange when the Sort By value changes", () => {
    render(<ArticlesHeader {...mockProps} />);
    const sortBySelect = screen.getByRole("combobox", { name: "sort-by"});
    fireEvent.change(sortBySelect, { target: { value: "views" } });
    expect(mockProps.handleSortChange).toHaveBeenCalledWith("views");

    fireEvent.change(sortBySelect, { target: { value: "shares" } });
    expect(mockProps.handleSortChange).toHaveBeenCalledWith("shares");
  });

  it("should render the Sort Order dropdown with options", () => {
    render(<ArticlesHeader {...mockProps} />);
    const sortOrderSelect = screen.getByRole("combobox", {
      name: "sort-order",
    });
    expect(sortOrderSelect).toBeInTheDocument();
    expect(screen.getByText("Sort Order")).toBeInTheDocument();
    expect(screen.getByText("Low to High")).toBeInTheDocument();
    expect(screen.getByText("High to Low")).toBeInTheDocument();
  });

  it("should call handleSortOrderChange when the Sort Order value changes", () => {
    render(<ArticlesHeader {...mockProps} />);
    const sortOrderSelect = screen.getByRole("combobox", {
      name: "sort-order",
    });
    fireEvent.change(sortOrderSelect, { target: { value: "ASC" } });
    expect(mockProps.handleSortOrderChange).toHaveBeenCalledWith("ASC");

    fireEvent.change(sortOrderSelect, { target: { value: "DESC" } });
    expect(mockProps.handleSortOrderChange).toHaveBeenCalledWith("DESC");
  });

  it("should render the Items per page dropdown with provided page sizes", () => {
    render(<ArticlesHeader {...mockProps} />);
    const pageSizeSelect = screen.getByRole("combobox", {
      name: "items-per-page",
    });
    expect(pageSizeSelect).toBeInTheDocument();
    expect(screen.getByText("Items per page")).toBeInTheDocument();
    mockProps.pageSizes.forEach((size) => {
      expect(screen.getByText(size.toString())).toBeInTheDocument();
    });
  });

  it("should call onPageSizeChange when the Items per page value changes", () => {
    render(<ArticlesHeader {...mockProps} />);
    const pageSizeSelect = screen.getByRole("combobox", {
      name: "items-per-page",
    });
    fireEvent.change(pageSizeSelect, { target: { value: "20" } });
    expect(mockProps.onPageSizeChange).toHaveBeenCalledWith(20);

    fireEvent.change(pageSizeSelect, { target: { value: "50" } });
    expect(mockProps.onPageSizeChange).toHaveBeenCalledWith(50);
  });

  it("should render the SearchInput component with correct props", () => {
    render(<ArticlesHeader {...mockProps} />);
    const searchInputMock = screen.getByPlaceholderText("Search articles...");
    expect(searchInputMock).toBeInTheDocument();
    expect((searchInputMock as HTMLInputElement).value).toBe(
      mockProps.searchTerm,
    );
    fireEvent.change(searchInputMock, { target: { value: "new search term" } });
    expect(mockProps.onSearchChange).toHaveBeenCalledWith("new search term");
  });
});
