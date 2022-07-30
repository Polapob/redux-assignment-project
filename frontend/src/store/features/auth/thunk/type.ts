export interface ValidationErrors {
  statusCode: number;
  message: string;
  error: string;
}

export type ILoginType = {
  email: string;
  password: string;
};

export type IRegisterType = {
  email: string;
  password: string;
  nickname: string;
  firstname: string;
  lastname: string;
  role: "USER" | "ADMIN";
};
