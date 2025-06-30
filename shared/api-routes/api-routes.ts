const API_KEYS = {
  AUTH: "/auth",
  QR_READER: "/qr",
  ROUTE_SHEETS: "/route-sheets",
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_KEYS.AUTH}/login`,
  },
  QR_READER: {
    VALIDATE: `${API_KEYS.QR_READER}/validate`,
  },
  ROUTE_SHEETS: {
    GET_BY_DRIVER: `${API_KEYS.ROUTE_SHEETS}/driver`,
  },
};
