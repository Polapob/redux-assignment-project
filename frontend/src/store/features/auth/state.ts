export interface InitialAuthInterface {
  sessionId: string;
  error: null | string;
}

const createInitialState = (): InitialAuthInterface => {
  return {
    sessionId: "",
    error: null,
  };
};

export const initialState = createInitialState();
