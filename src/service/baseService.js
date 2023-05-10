import axios from "axios";
import { SALE_API } from "../utils/config";
import { actGetAccount } from "@/redux/auth/authSlice";

const NO_RETRY_HEADER = "x-no-retry";
const api = axios.create({
  baseURL: SALE_API,
  withCredentials: true,
});
const handleRefreshToken = async () => {
  const res = await api.get("auth/refresh");
  // res && res.data ? res.data.access_token : null;
  if (res && res.data) return res.data.access_token;
  else null;
};
// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers = {
      ...config.headers,
      Authorization: localStorage.getItem("access")
        ? `Bearer ${localStorage.getItem("access")}`
        : "",
    };
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = true;
      if (access_token) {
        error.config.headers.Authorization = `Bearer ${access_token}`;
        localStorage.setItem("access", access_token);
        return api(error.config);
      }
    }

    // if (
    //   error.config &&
    //   error.response &&
    //   +error.response.status === 400 &&
    //   error.config.url === "auth/refresh"
    // ) {
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export { api };
