// utils/auth.js
export const getUserNameAndIdFromToken = (token) => {
  if (!token) return { name: "", id: null };
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return {
      name:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ] || "",
      id:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ] || null,
    };
  } catch (e) {
    console.error("Error decoding token:", e);
    return { name: "", id: null };
  }
};
