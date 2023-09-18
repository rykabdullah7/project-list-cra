import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add an interceptor to attach the authentication header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = config.headers['Authorization']; // Get token from config
    if (token) {
      config.headers['Authorization'] = `Basic ${btoa(`api@arbisoft.com:${token}`)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
