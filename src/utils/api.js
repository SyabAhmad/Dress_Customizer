// API utility functions for backend communication
const API_BASE_URL = "http://localhost:5000/api";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add JWT token if available
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || "API request failed", response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error", 0);
  }
};

export const authAPI = {
  signup: (userData) =>
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  signin: (credentials) =>
    apiRequest("/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  verify: () => apiRequest("/auth/verify"),

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user-name");
  },
};

export const accountsAPI = {
  getProfile: () => apiRequest("/accounts/profile"),

  updateProfile: (profileData) =>
    apiRequest("/accounts/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
};

export const gownDesignsAPI = {
  getAll: () => apiRequest("/gown-designs"),

  create: (designData) =>
    apiRequest("/gown-designs", {
      method: "POST",
      body: JSON.stringify(designData),
    }),

  getById: (id) => apiRequest(`/gown-designs/${id}`),

  update: (id, designData) =>
    apiRequest(`/gown-designs/${id}`, {
      method: "PUT",
      body: JSON.stringify(designData),
    }),

  delete: (id) =>
    apiRequest(`/gown-designs/${id}`, {
      method: "DELETE",
    }),
};

export const bodyProfilesAPI = {
  getAll: () => apiRequest("/body-profiles"),

  create: (profileData) =>
    apiRequest("/body-profiles", {
      method: "POST",
      body: JSON.stringify(profileData),
    }),

  update: (profileData) =>
    apiRequest("/body-profiles", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
};

export default apiRequest;
