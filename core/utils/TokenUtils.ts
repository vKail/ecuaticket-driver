export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("accessToken");
};
