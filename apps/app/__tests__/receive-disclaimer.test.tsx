import { fireEvent, render, screen } from "@testing-library/react";
import { ReceiveDisclaimer } from "../components/receive/disclaimer";

describe("ReceiveDisclaimer", () => {
  it("shows and hides accordion content", () => {
    render(<ReceiveDisclaimer />);
    const trigger = screen.getByRole("button", { name: /why a new wallet address/i });
    // content should be hidden initially
    expect(screen.queryByText(/To help protect your privacy/)).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByText(/To help protect your privacy/)).toBeInTheDocument();
  });
});
