import { LinkProps } from "next/link";
import NavbarBreadcrumb from "../../Breadcrumb/NavbarBreadcrumb";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ReactNode } from "react";

interface INextLinkMock extends LinkProps {
  children?: ReactNode;
}

let location = "";

jest.mock("next/link", () => {
  const MockNextLink = ({ href, children, ...restProps }: INextLinkMock) => (
    <nav data-testid={href}>
      <a
        href={href.toString()}
        {...restProps}
        onClick={() => {
          location = href.toString();
        }}
      >
        {children}
      </a>
    </nav>
  );
  return MockNextLink;
});

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
    const registerText = getByText("register");
    const loginText = getByText("login");
    const registerNav = getByTestId("/register");
    const loginNav = getByTestId("/login");
    const registerLink = getByTestId("register-link");
    const loginLink = getByTestId("login-link");
    const breadcrumbItems = breadcrumbContainer.firstChild;
    // console.log(breadcrumbContainer);
    expect(breadcrumbContainer).toBeVisible();
    expect(registerText).toBeVisible();
    expect(loginText).toBeVisible();
    expect(breadcrumbItems?.childNodes.length).toEqual(calculateNumberItems(mockBreadcrumbMetadata.length));
    expect(loginLink.getAttribute("href")).toStrictEqual("/login");
    expect(registerLink.getAttribute("href")).toStrictEqual("/register");

    fireEvent.click(registerLink);
    expect(location).toBe("/register");

    fireEvent.click(loginLink);
    expect(location).toBe("/login");
  });
});
