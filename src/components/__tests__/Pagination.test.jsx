import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination";

test("renders pagination buttons", () => {

  render(
    <Pagination
      currentPage={1}
      totalPages={5}
      setCurrentPage={() => {}}
    />
  );

  expect(screen.getByText("Next")).toBeInTheDocument();
  expect(screen.getByText("Previous")).toBeInTheDocument();
});