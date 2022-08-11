import MockAdapter from "axios-mock-adapter";
import apiClient from "../../../../utils/axios";
import { InitialAuthInterface, initialState, LoadingStatus } from "../../../features/auth/state";
import handleLoginPost from "../../../features/auth/thunk/handleLoginPost";
import handleRegisterPost from "../../../features/auth/thunk/handleRegisterPost";

import store from "../../../store";
import { ILoginType, IRegisterType } from "../../../features/auth/thunk/type";

enum AxiosTypes {
  GET = "GET",
  DELETE = "DELETE",
  POST = "POST",
  PATCH = "PATCH",
}

const getAuthState = () => {
  return store.getState().auth;
};

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
  beforeEach(() => {});
  it("initially set auth store correctly", () => {
    const authState = getAuthState();
    expect(authState).toEqual({
      sessionId: "",
      error: null,
      loading: LoadingStatus.IDLE,
    });
  });

  it("connection error occurs while a user logins", async () => {
    const mockReturnValue = {
      statusCode: 500,
      error: "Network Error",
      message: "Network Error",
    };
    mockAxios(AxiosTypes.POST, "auth/login", 500, mockReturnValue);
    const testBody: ILoginType = { email: "", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    const { loading, error } = getAuthState();

    expect(payload).toStrictEqual(mockReturnValue);
    expect({ loading, error }).toStrictEqual({
      loading: LoadingStatus.ERROR,
      error: mockReturnValue.error,
    });
    console.log("state =", store.getState());
  });

  it("handle when user's email not found", async () => {
    const mockReturnValue = {
      statusCode: 404,
      error: "Not Found",
      message: "User's email not found in database.",
    };
    mockAxios(AxiosTypes.POST, "auth/login", 404, mockReturnValue);
    const testBody: ILoginType = { email: "test12341@hotmail.com", password: "test12342" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    const { loading, error } = getAuthState();
    expect(payload).toStrictEqual(mockReturnValue);
    expect({ loading, error }).toStrictEqual({
      loading: LoadingStatus.ERROR,
      error: mockReturnValue.error,
    });
  });

  it("handle when user's in valid password", async () => {
    const mockReturnValue = {
      statusCode: 400,
      error: "Bad Request",
      message: "Invalid password.",
    };
    mockAxios(AxiosTypes.POST, "auth/login", 400, mockReturnValue);
    const testBody: ILoginType = { email: "test12341@hotmail.com", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    const { loading, error } = getAuthState();
    expect(payload).toStrictEqual(mockReturnValue);
    expect({ loading, error }).toStrictEqual({
      loading: LoadingStatus.ERROR,
      error: mockReturnValue.error,
    });
  });

  it("handle when user's successfully login", async () => {
    const sessionId = "3851ee8a-a7de-46a4-aaa9-f6095dddcd2a";
    const mockReturnValue = { sessionId };
    mockAxios(AxiosTypes.POST, "auth/login", 200, mockReturnValue);
    const testBody: ILoginType = { email: "test12341@hotmail.com", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    const state = getAuthState();
    expect(payload).toStrictEqual(mockReturnValue);
    expect(state).toStrictEqual({
      loading: LoadingStatus.FINISH,
      error: "",
      sessionId,
    });
  });

  it("handle when error.response is undefined", async () => {
    mockAxios(AxiosTypes.POST, "auth/login", 500, {});
    const testBody: ILoginType = { email: "", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    const { loading, error } = getAuthState();
    expect(payload).toStrictEqual({});
    expect({ loading, error }).toStrictEqual({
      loading: LoadingStatus.ERROR,
      error: undefined,
    });
  });

  it("connection error occurs while user registers", async () => {
    const mockReturnValue = {
      statusCode: 500,
      error: "Network Error",
      message: "Network Error",
    };
    mockAxios(AxiosTypes.POST, "auth/register", mockReturnValue.statusCode, mockReturnValue);
    const testBody: IRegisterType = {
      email: "",
      password: "",
      nickName: "",
      firstName: "",
      lastName: "",
      role: "USER",
    };
    const { payload } = await store.dispatch(handleRegisterPost(testBody));
    const { error, loading } = getAuthState();
    expect(payload).toStrictEqual(mockReturnValue);
    expect({ error, loading }).toStrictEqual({
      error: mockReturnValue.error,
      loading: LoadingStatus.ERROR,
    });
  });

  it("register error due to status bad request", async () => {
    const mockReturnValue = {
      statusCode: 400,
      error: "Bad request",
      message: "Bad request",
    };

    mockAxios(AxiosTypes.POST, "auth/register", mockReturnValue.statusCode, mockReturnValue);
    const testBody: IRegisterType = {
      email: "",
      password: "",
      nickName: "",
      firstName: "",
      lastName: "",
      role: "USER" as "USER" | "ADMIN",
    };
    const { payload } = await store.dispatch(handleRegisterPost(testBody));
    const { error, loading } = getAuthState();
    expect(payload).toStrictEqual(mockReturnValue);
    expect({ error, loading }).toStrictEqual({
      error: mockReturnValue.error,
      loading: LoadingStatus.ERROR,
    });
  });

  it("register success when condition is ok", async () => {
    const mockReturnValue = {
      email: "aaa@hotmail.com",
      firstName: "",
      lastName: "",
      nickName: "",
      role: "USER" as "USER" | "ADMIN",
    };
    const testBody: IRegisterType = { ...mockReturnValue, email: "aaa@hotmail.com", password: "123" };
    mockAxios(AxiosTypes.POST, "auth/register", 200, mockReturnValue);
    const { payload } = await store.dispatch(handleRegisterPost(testBody));
    const { error, loading } = getAuthState();
    expect(payload).toStrictEqual(mockReturnValue);
    expect({ error, loading }).toStrictEqual({
      error: "",
      loading: LoadingStatus.FINISH,
    });
  });
});
