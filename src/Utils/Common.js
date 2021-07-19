export const getUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const token = userInfo.token;
  const userData = atob(token).replace(":", " ").split(" ");
  if (userData) return userData;
  else return null;
};

export const getRole = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  return userInfo.role || null;
};

export const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  return userInfo.token || null;
};

export const removeUserSession = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};
