import React from "react";
import { render } from "@testing-library/react";
import FrontEnd from "./front-end";

test("renders learn react link", () => {
  const { getByText } = render(<FrontEnd />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
