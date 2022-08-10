import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LoadingModal from "../../../common/Modal/LoadingModal";

describe("testing modal ui", () => {
  it("don't display content when modal isn't open", () => {
    const { queryByTestId } = render(<LoadingModal open={false} />);
    const modalContainer = queryByTestId("modal-container");
    const modalContent = queryByTestId("modal-content");
    const typography = queryByTestId("modal-text");
    expect(modalContainer).toBeNull();
    expect(typography).toBeNull();
    expect(modalContent).toBeNull();
  });

  it("display content when modal is open", () => {
    const { queryByTestId } = render(<LoadingModal open />);
    const modalContainer = queryByTestId("modal-container");
    const modalContent = queryByTestId("modal-content");
    const typography = queryByTestId("modal-text");

    expect(modalContainer).not.toBeNull();
    expect(modalContent).not.toBeNull();
    expect(typography).toHaveTextContent("Waiting for server processing.");
  });

  it("close modal after user click close", () => {
    const { queryByTestId } = render(<LoadingModal open />);
    const modalContainer = queryByTestId("modal-container");
    const modalContent = queryByTestId("modal-content");
    const typography = queryByTestId("modal-text");
  });
});
