import axios from "axios";

// ⚠️ IMPORTANT:
// Replace this IP later with your laptop's local IP when backend is running
// Example: http://192.168.1.10:8000/api
const BASE_URL = "http://192.168.1.X:8000/api/";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 🔐 Prepare token authorization (used after login works)
API.interceptors.request.use(
  async (config) => {
    const token = ""; // Later: stored in SecureStore
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------------
// 🔽 AUTH ENDPOINTS
// ----------------------------

export const registerUser = (data) => API.post("/auth/register/", data);

export const loginUser = (data) => API.post("/auth/login/", data);

// ----------------------------
// 🔽 PARENT ACCOUNT / CHILD INFO
// ----------------------------

export const updateParentInfo = (data) => API.put("/parent/update/", data);

export const addChild = (data) => API.post("/child/add/", data);

export const getChildren = () => API.get("/child/list/");

// ----------------------------
// 🔽 VITALS (IoT Data)
// ----------------------------

export const getVitalsTimeline = () => API.get("/vitals/timeline/");

// ----------------------------
// 🔽 NOTIFICATIONS
// ----------------------------

export const getNotifications = () => API.get("/notifications/");

export default API;
