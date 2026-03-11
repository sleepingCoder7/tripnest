import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter } from "react-router";

test("renders homepage banner", () => {

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  expect(
    screen.getByText("Find your perfect stay with TripNest")
  ).toBeInTheDocument();

});