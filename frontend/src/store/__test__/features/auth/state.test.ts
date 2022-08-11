import { createInitialState, LoadingStatus } from "../../../features/auth/state";

enum MockLoadingStatus {
  LOADING = "LOADING",
  IDLE = "IDLE",
  ERROR = "ERROR",
  FINISH = "FINISH",
}
describe("test initial state", () => {
  it("create initial state", () => {
    const result = createInitialState();
    expect(result).toEqual({
      sessionId: "",
      error: null,
      loading: MockLoadingStatus.IDLE,
    });
  });
});
