import { render, screen } from "@testing-library/react";
import Summary from "../Summary";
import {MemoryRouter} from "react-router";


describe("Summary", () => {
	const component = <MemoryRouter><Summary /></MemoryRouter>

	it("should match snapshot", () => {
		const container = render(component)
		expect(container).toMatchSnapshot()
	});

  it("shoul render Header and and loading components", () => {
    render(component);

    expect(screen.getByText("Vitenest")).toBeInTheDocument();
    expect(screen.getByLabelText("metrics-skeleton")).toBeInTheDocument();
  });

});
