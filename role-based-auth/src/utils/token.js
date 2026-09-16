// src/utils/token.js

export const getUser = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return JSON.parse(
      atob(token.split(".")[1])
    );
  } catch (error) {
    return null;
  }
};

export const getRole = () => {
  const user = getUser();
  return user?.role;
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
};