import { jwtDecode } from "jwt-decode";

/**
 * Decode token and persist derived user fields.
 * Safe to call multiple times; it will overwrite with same values.
 */
export const persistUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);

    const userId = decoded?.id || decoded?._id || decoded?.userId || null;
    const name = decoded?.name || "";
    const email = decoded?.email || "";

    if (!userId) {
      console.warn("UserId not found in token payload");
      return null;
    }

    // persist
    localStorage.setItem("userId", userId);
    if (name) localStorage.setItem("userName", name);
    if (email) localStorage.setItem("userEmail", email);

    return { id: userId, name, email };
  } catch (e) {
    console.error("Token decode failed:", e);
    return null;
  }
};

/** Read helpers (no decoding) */
export const getStoredUser = () => ({
  id: localStorage.getItem("userId"),
  name: localStorage.getItem("userName"),
  email: localStorage.getItem("userEmail"),
});

export const getToken = () => localStorage.getItem("token");

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
};