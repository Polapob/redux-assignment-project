import { renderHook, act } from "@testing-library/react-hooks";
import useModalOpen from "../useModalOpen";

describe("testing useModalOpen hooks", () => {
  it("if open is true modal should open", () => {
    const { result } = renderHook(() => useModalOpen(true));
    const [modalOpen, _] = result.current;
    expect(modalOpen).toBe(true);
  });
  it("if open is false modal should close", () => {
    const { result } = renderHook(() => useModalOpen(false));
    const [modalOpen, _] = result.current;
    expect(modalOpen).toBe(false);
  });

  it("if open is true and user close modal modal will close.", () => {
    const { result } = renderHook(() => useModalOpen(true));
    const [modalOpen, closeModal] = result.current;
    expect(modalOpen).toBe(true);
    act(() => {
      closeModal();
    });
    expect(result.current[0]).toBe(false);
  });
});
