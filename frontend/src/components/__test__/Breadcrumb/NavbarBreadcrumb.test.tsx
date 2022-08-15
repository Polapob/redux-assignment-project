import NavbarBreadcrumb from "../../Breadcrumb/NavbarBreadcrumb";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const calculateNumberItems = (data: number) => data * 2 - 1;
describe("Testing navigation bar breadcrumb component", () => {
  it("initialize component with initial array", () => {
    const { getByTestId } = render(<NavbarBreadcrumb breadcrumbMetadata={[]} />);
    const breadcrumbContainer = getByTestId("breadcrumbs-container");
    const breadcrumbChildren = breadcrumbContainer.firstChild?.firstChild;
    expect(breadcrumbContainer).toBeVisible();
    expect(breadcrumbChildren).toBeNull();
  });
  it("initialize component with arrays", () => {
    const mockBreadcrumbMetadata = [
      { linkTo: "/register", text: "register" },
      { linkTo: "/login", text: "login" },
    ];
    const { getByText, getByTestId } = render(<NavbarBreadcrumb breadcrumbMetadata={mockBreadcrumbMetadata} />);
    const breadcrumbContainer = getByTestId("breadcrumbs-container");
    const registerLink = getByText("register");
    const loginLink = getByText("login");
    const breadcrumbItems = breadcrumbContainer.firstChild;
    expect(breadcrumbContainer).toBeVisible();
    expect(registerLink).toBeVisible();
    expect(loginLink).toBeVisible();
    expect(breadcrumbItems?.childNodes.length).toEqual(calculateNumberItems(mockBreadcrumbMetadata.length));
  });
});
