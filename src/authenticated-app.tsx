import React from "react";
import { ProjectListScreen } from "./screen/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth();
  const logoutButton = <button onClick={logout}>退出登录</button>;
  return (
    <div>
      {user ? logoutButton : null}
      <ProjectListScreen />
    </div>
  );
};
