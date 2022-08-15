import { render, screen } from "@testing-library/react";
import FormLayoutWrapper from "../../layout/FormLayoutWrapper";
import "@testing-library/jest-dom";

describe("Test Form layout wrapper component", () => {
  it("initially correct wrapper logic when there isn't children", () => {
    const { getByTestId } = render(<FormLayoutWrapper />);
    const formLayoutContainer = getByTestId("formlayout-container");
    const formLayoutBox = getByTestId("formlayout-box");
    const layoutNavbar = formLayoutBox.childNodes.item(0);
    expect(formLayoutContainer).toBeVisible();
    expect(formLayoutBox).toBeVisible();
    expect(layoutNavbar).toBeVisible();
    expect(formLayoutBox.childElementCount).toEqual(1);
  });
  it("Wrapper show correct chlidren element", () => {
    const mockChildren = <div data-testid="test-mock-children">Test Mock Children</div>;
    const { getByTestId, getByText } = render(<FormLayoutWrapper>{mockChildren}</FormLayoutWrapper>);
    const formLayoutContainer = getByTestId("formlayout-container");
    const formLayoutBox = getByTestId("formlayout-box");
    const layoutNavbar = formLayoutBox.childNodes.item(0);
    const childrenNode = getByTestId("test-mock-children");
    expect(formLayoutContainer).toBeVisible();
    expect(formLayoutBox).toBeVisible();
    expect(layoutNavbar).toBeVisible();
    expect(childrenNode).toBeVisible();
    expect(formLayoutBox.childElementCount).toEqual(2);
    expect(getByText("Test Mock Children")).toBeVisible();
  });
});
