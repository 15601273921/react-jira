import React, { useState } from "react";
import { AuthForm } from "../interface/AuthForm";
import * as auth from "auth-provider";
import { User } from "interface/User";
import { http } from "../utils/http";
import { useMount } from "../utils";

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthContext 中使用");
  }
  return context;
};

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const result = await http("/me", { token });
    user = result.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
