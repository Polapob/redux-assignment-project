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
  nickName: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
};
