import { render, screen } from "@testing-library/react";
import Calendar from "./Calendar";

test("renders calendar heading", () => {
  render(<Calendar />);
  expect(screen.getByText(/Post Calendar/i)).toBeInTheDocument();
});