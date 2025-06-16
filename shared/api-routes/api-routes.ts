const API_KEYS = {
  AUTH: "/auth",
  QR_READER: "/qr",
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_KEYS.AUTH}/login`,
  },
  QR_READER: {
    VALIDATE: `${API_KEYS.QR_READER}/validate`,
  },
};
