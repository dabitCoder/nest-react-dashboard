import { render, screen } from "@testing-library/react";
import Highlights from "../Highlights";

describe("Highlights", () => {
  it("should render the heading", () => {
    render(<Highlights />);
    expect(
      screen.getByRole("heading", { name: /Highlights/i }),
    ).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const container = render(<Highlights />)
    expect(container).toMatchSnapshot()
  })

  it("should render the descriptive text", () => {
    render(<Highlights />);
    expect(
      screen.getByText(
        /Welcome Edelman_User, here's the summary of what's going on/i,
      ),
    ).toBeInTheDocument();
  });
});
