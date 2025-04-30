import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import ArticlesFiltersAuthors from "../ArticlesFiltersAuthors";
import { Author } from "../../../../types";

describe("ArticlesFiltersAuthors", () => {
	const authors: Author[] = [
		{
			id: 1, name: "John Doe",
			createdAt: "",
			updatedAt: ""
		},
		{
			id: 2, name: "Jane Smith",
			createdAt: "",
			updatedAt: ""
		},
	];
	const onAuthorFilterChange = vi.fn();

	const setup = (selectedAuthorId = "") =>
		render(
			<ArticlesFiltersAuthors
				authors={authors}
				onAuthorFilterChange={onAuthorFilterChange}
				selectedAuthorId={selectedAuthorId}
			/>,
		);

	it('should match snapshot', () => {
		const container = setup()
		expect(container).toMatchSnapshot()
	})

	it("should render correctly with default values", () => {
		setup();

		expect(screen.getByText("Filter by Author")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
	});

	it("should call onAuthorFilterChange correctly when selecting a new author", () => {
		setup();
		const selectElement = screen.getByLabelText("filter-by-author");

		fireEvent.change(selectElement, { target: { value: "2" } });

		expect(onAuthorFilterChange).toHaveBeenCalledWith("2");
	});

	it("should call onAuthorFilterChange correctly when selecting default option", () => {
		setup("1");
		const selectElement = screen.getByLabelText("filter-by-author");

		fireEvent.change(selectElement, { target: { value: "" } });

		expect(onAuthorFilterChange).toHaveBeenCalledWith("");
	});

	it("should handle undefined authors array gracefully", () => {
		render(
			<ArticlesFiltersAuthors
				authors={undefined}
				onAuthorFilterChange={onAuthorFilterChange}
				selectedAuthorId=""
			/>,
		);

		expect(screen.getByText("Filter by Author")).toBeInTheDocument();
		expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
	});
});
