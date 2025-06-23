import { render, screen } from "@testing-library/react";
import { LandingNewFlow } from "../components/landing/new-flow";

describe("LandingNewFlow", () => {
	it("renders welcome text", () => {
		render(<LandingNewFlow />);
		expect(screen.getByText(/Welcome to ToshiMe/)).toBeInTheDocument();
	});
});
