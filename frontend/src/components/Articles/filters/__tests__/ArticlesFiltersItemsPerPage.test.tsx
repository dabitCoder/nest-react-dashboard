import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import ArticlesFiltersItemsPerPage from "../ArticlesFiltersItemsPerPage";

describe("ArticlesFiltersItemsPerPage", () => {
	const onPageSizeChange = vi.fn();

	const setup = (currentLimit = 5) =>
		render(
			<ArticlesFiltersItemsPerPage
				currentLimit={currentLimit}
				onPageSizeChange={onPageSizeChange}
			/>,
		);

	it('should match snapshot', () => {
		const container = setup()
		expect(container).toMatchSnapshot()
	})

	it("shoudl render correctly with default values", () => {
		setup();

		expect(screen.getByText("Items per page")).toBeInTheDocument();
		expect(screen.getByText("5")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
		expect(screen.getByText("20")).toBeInTheDocument();
		expect(screen.getByText("50")).toBeInTheDocument();
	});

	it("should call onPageSizeChange correctly when selecting a new option", () => {
		setup();
		const selectElement = screen.getByLabelText("items-per-page");

		fireEvent.change(selectElement, { target: { value: "20" } });

		expect(onPageSizeChange).toHaveBeenCalledWith(20);
	});
});
