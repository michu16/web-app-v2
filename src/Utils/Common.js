export const getUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const token = userInfo.token;
  const userData = atob(token).replace(":", " ").split(" ");
  if (userData) return userData;
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  return userInfo.token || null;
};

export const getRole = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  return userInfo.role || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

// set the token and user from the session storage
// export const setUserSession = (token, user) => {
//   sessionStorage.setItem("token", token);
//   sessionStorage.setItem("user", JSON.stringify(user));
// };
