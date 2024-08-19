// utils/auth.js
export const getUserNameFromToken = (token) => {
  if (!token) return "";
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return (
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ] || ""
    );
  } catch (e) {
    return "";
  }
};
