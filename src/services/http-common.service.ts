import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ResponseObject } from '../types/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: ResponseObject = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
    return responseObject as unknown as AxiosResponse;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = Number(error.response?.status);
    if (status === 401) {
      handleUnauthorized();
    }
    if (status >= 500) {
      reportError(error);
    }
    return Promise.reject(normalizeApiError(error));
  }
);

function normalizeApiError(error: AxiosError) {
  return {
    status: Number(error.response?.status) ?? null,
    statusText: error?.response?.statusText ?? 'Something went wrong!',
    data: error?.response?.data,
  };
}

function handleUnauthorized() {
  //to do
}

export default apiClient;
