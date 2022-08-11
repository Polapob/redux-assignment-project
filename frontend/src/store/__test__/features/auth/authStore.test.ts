import MockAdapter from "axios-mock-adapter";
import apiClient from "../../../../utils/axios";
import authSlice from "../../../features/auth/authSlice";
import { LoadingStatus } from "../../../features/auth/state";
import handleLoginPost from "../../../features/auth/thunk/handleLoginPost";
import store from "../../../store";

enum AxiosTypes {
  GET = "GET",
  DELETE = "DELETE",
  POST = "POST",
  PATCH = "PATCH",
}

const mockAxios = <T>(type: AxiosTypes, requestURL: string, responseStatus: number, responseData: T) => {
  const mock = new MockAdapter(apiClient);
  switch (type) {
    case AxiosTypes.GET:
      mock.onGet(requestURL).reply(responseStatus, responseData);
      break;
    case AxiosTypes.DELETE:
      mock.onDelete(requestURL).reply(responseStatus, responseData);
      break;
    case AxiosTypes.POST:
      mock.onPost(requestURL).reply(responseStatus, responseData);
    case AxiosTypes.PATCH:
      mock.onPatch(requestURL).reply(responseStatus, responseData);
    default:
      break;
  }
};

describe("Auth store redux state test", () => {
  beforeAll(() => {});
  it("initially set auth store correctly", () => {
    const authState = store.getState().auth;
    expect(authState).toEqual({
      sessionId: "",
      error: null,
      loading: LoadingStatus.IDLE,
    });
  });

  it("handle when network doesn't connect", async () => {
    mockAxios(AxiosTypes.POST, "auth/login", 500, {
      statusCode: 500,
      error: "Network Error",
      message: "Network Error",
    });
    const testBody = { email: "", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    expect(payload).toStrictEqual({
      statusCode: 500,
      error: "Network Error",
      message: "Network Error",
    });
  });

  it("handle when user's email not found", async () => {
    mockAxios(AxiosTypes.POST, "auth/login", 404, {
      statusCode: 404,
      error: "Not Found",
      message: "User's email not found in database.",
    });
    const testBody = { email: "test12341@hotmail.com", password: "test12342" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    expect(payload).toStrictEqual({
      statusCode: 404,
      error: "Not Found",
      message: "User's email not found in database.",
    });
  });

  it("handle when user's in valid password", async () => {
    mockAxios(AxiosTypes.POST, "auth/login", 400, {
      statusCode: 400,
      error: "Bad Request",
      message: "Invalid password.",
    });
    const testBody = { email: "test12341@hotmail.com", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    expect(payload).toStrictEqual({
      statusCode: 400,
      error: "Bad Request",
      message: "Invalid password.",
    });
  });

  it("handle when user's successfully login", async () => {
    const mockSessionId = "3851ee8a-a7de-46a4-aaa9-f6095dddcd2a";
    mockAxios(AxiosTypes.POST, "auth/login", 200, { sessionId: mockSessionId });
    const testBody = { email: "test12341@hotmail.com", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    expect(payload).toStrictEqual({ sessionId: mockSessionId });
    const authState = store.getState().auth;
    expect(authState).toStrictEqual({
      sessionId: mockSessionId,
      error: "",
      loading: LoadingStatus.FINISH,
    });
  });
});
