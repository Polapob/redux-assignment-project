import { renderHook, act } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../../store/store";
import useFormSubmit, { UseFormSubmitInterface } from "../useFormSubmit";

const testWrapper = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;

describe("test useFormSubmit hooks", () => {
  it("hooks can return onSubmit function", () => {
    /*const { result } = renderHook(() => useFormSubmit({} as UseFormSubmitInterface), {
      wrapper: testWrapper,
    });
    expect(result.current[0]).not.toBeNull();*/
  });
});
