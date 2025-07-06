import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Vite + React header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Vite \+ React/i);
  expect(headerElement).toBeTruthy();
});
