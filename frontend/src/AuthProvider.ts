import { AuthContextProps } from "react-oidc-context";

let auth: AuthContextProps | null = null;

export const setAuth = (authContext: AuthContextProps) => {
  auth = authContext;
};

export const getAuth = (): AuthContextProps => {
  if (!auth) {
    throw new Error(
      "Auth has not been initialized. Please set it before using.",
    );
  }
  return auth;
};
