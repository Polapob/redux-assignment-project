export enum LoadingStatus {
  LOADING = "LOADING",
  IDLE = "IDLE",
  ERROR = "ERROR",
  FINISH = "FINISH",
}
export interface InitialAuthInterface {
  sessionId: string;
  error: null | string;
  loading: LoadingStatus;
}

const createInitialState = (): InitialAuthInterface => {
  return {
    sessionId: "",
    error: null,
    loading: LoadingStatus.IDLE,
  };
};

export const initialState = createInitialState();
