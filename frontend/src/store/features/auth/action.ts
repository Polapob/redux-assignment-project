import { createAction } from "@reduxjs/toolkit";

export const loginAction = createAction("auth/login", function prepare(email: string, password: string) {
  return {
    payload: {
      email,
      password,
      createdAt: new Date().toISOString(),
    },
  };
});

export const createExtraActions = () => {
  const baseUrl = `${process.env.NEX}/users`;
  const login = () => {};

  return {
    login: login(),
  };
};
