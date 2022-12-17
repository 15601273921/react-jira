import { User } from "interface/User";
import { AuthForm } from "./interface/AuthForm";

const apiUrl = process.env.REACT_APP_API_URL;
const localStoreKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStoreKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStoreKey, user.token || "");
  return user;
};

export const login = (data: AuthForm) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const json = await res.json();
    if (res.ok) {
      return handleUserResponse(json);
    } else {
      return Promise.reject(data);
    }
  });
};

/**
 * 注册
 * @param data
 */
export const register = async (data: AuthForm) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const json = await res.json();
    if (res.ok) {
      return handleUserResponse(json);
    } else {
      return Promise.reject(data);
    }
  });
};

/**
 * 退出登录
 */
export const logout = async () => window.localStorage.removeItem(localStoreKey);
