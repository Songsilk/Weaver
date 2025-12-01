import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const storedUser = localStorage.getItem("weaver_user");
      const storedToken = localStorage.getItem("weaver_token");

      if (storedUser && storedToken) {
        return {
          user: JSON.parse(storedUser),
          token: storedToken
        };
      }
    } catch {}

    return {
      user: null,
      token: null
    };
  });

  const login = (user, token) => {
    localStorage.setItem("weaver_user", JSON.stringify(user));
    localStorage.setItem("weaver_token", token);

    setAuth({ user, token });
  };

  const logout = () => {
    localStorage.removeItem("weaver_user");
    localStorage.removeItem("weaver_token");

    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
