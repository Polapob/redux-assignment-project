import MockAdapter from "axios-mock-adapter";
import apiClient from "../../../../utils/axios";
import authSlice from "../../../features/auth/authSlice";
import { LoadingStatus } from "../../../features/auth/state";
import handleLoginPost from "../../../features/auth/thunk/handleLoginPost";
import handleRegisterPost from "../../../features/auth/thunk/handleRegisterPost";
import { ILoginType, IRegisterType } from "../../../features/auth/thunk/type";
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

  it("connection error occurs while user logins", async () => {
    const mockReturnValue = {
      statusCode: 500,
      error: "Network Error",
      message: "Network Error",
    };
    mockAxios(AxiosTypes.POST, "auth/login", 500, mockReturnValue);
    const testBody: ILoginType = { email: "", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    expect(payload).toStrictEqual({
      statusCode: 500,
      error: "Network Error",
      message: "Network Error",
    });
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
    expect(payload).toStrictEqual(mockReturnValue);
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
    expect(payload).toStrictEqual(mockReturnValue);
  });

  it("handle when user's successfully login", async () => {
    const sessionId = "3851ee8a-a7de-46a4-aaa9-f6095dddcd2a";
    const mockReturnValue = { sessionId };
    mockAxios(AxiosTypes.POST, "auth/login", 200, mockReturnValue);
    const testBody: ILoginType = { email: "test12341@hotmail.com", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    expect(payload).toStrictEqual(mockReturnValue);
    const authState = store.getState().auth;
    expect(authState).toStrictEqual({
      sessionId,
      error: "",
      loading: LoadingStatus.FINISH,
    });
  });

  it("handle when error.response is undefined", async () => {
    mockAxios(AxiosTypes.POST, "auth/login", 500, {});
    const testBody: ILoginType = { email: "", password: "" };
    const { payload } = await store.dispatch(handleLoginPost(testBody));
    expect(payload).toStrictEqual({});
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
      nickname: "",
      firstname: "",
      lastname: "",
      role: "USER",
    };
    const { payload } = await store.dispatch(handleRegisterPost(testBody));
    expect(payload).toStrictEqual(mockReturnValue);
  });
});
