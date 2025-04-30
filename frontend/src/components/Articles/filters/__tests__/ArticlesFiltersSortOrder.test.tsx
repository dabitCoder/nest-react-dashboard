import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import ArticlesFiltersSortOrder from "../ArticlesFiltersSortOrder";
import { SortOrder } from "../../../../types";

describe("ArticlesFiltersSortOrder", () => {
	const handleSortOrderChange = vi.fn();

	const setup = (sortOrder: SortOrder = "") =>
		render(
			<ArticlesFiltersSortOrder
				sortOrder={sortOrder}
				handleSortOrderChange={handleSortOrderChange}
			/>,
		);

	it('should match snapshot', () => {
		const container = setup()
		expect(container).toMatchSnapshot()
	})

	it("should render correctly with default values", () => {
		setup();

		expect(screen.getByText("Sort Order")).toBeInTheDocument();
		expect(screen.getByText("Low to High")).toBeInTheDocument();
		expect(screen.getByText("High to Low")).toBeInTheDocument();
	});

	it("should render correctly with given sortOrder value", () => {
		setup("ASC");

		const selectElement = screen.getByLabelText("sort-order") as HTMLSelectElement;
		expect(selectElement.value).toBe("ASC");
	});

	it("should call handleSortOrderChange correctly when selecting a new option", () => {
		setup();
		const selectElement = screen.getByLabelText("sort-order");

		fireEvent.change(selectElement, { target: { value: "DESC" } });

		expect(handleSortOrderChange).toHaveBeenCalledWith("DESC");
	});

	it("should handle selecting default empty option", () => {
		setup("ASC");
		const selectElement = screen.getByLabelText("sort-order");

		fireEvent.change(selectElement, { target: { value: "" } });

		expect(handleSortOrderChange).toHaveBeenCalledWith("");
	});
});
