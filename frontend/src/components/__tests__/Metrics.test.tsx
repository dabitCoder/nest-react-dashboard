import { render, screen } from "@testing-library/react";
import Metrics from "../Metrics";

describe("Metrics", () => {
  it("should render the main container with correct classes", () => {
    render(<Metrics />);
    const container = screen.getByLabelText("metrics-container");
    expect(container).toBeInTheDocument();
  });

	it('should match snapshot', () => {
		const container = render(<Metrics />)
		expect(container).toMatchSnapshot()
	})

  it("should render the stats number", () => {
    render(<Metrics />);
    expect(screen.getByText(/Article stats number 1/i)).toBeInTheDocument();
    const statsNumber = screen.getByText(/Article stats number 1/i);
    expect(statsNumber).toBeInTheDocument();
  });

  it("should render the stats description", () => {
    render(<Metrics />);
    expect(screen.getByText(/Articles stats here/i)).toBeInTheDocument();
    const statsDescription = screen.getByText(/Articles stats here/i);
    expect(statsDescription).toBeInTheDocument();
  });
});
