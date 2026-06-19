import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import type { ResponseObject } from "../types/types";
import { MSG_404 } from "../utils/constants";

 const apiClient =  axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
  }
});

apiClient.interceptors.request.use(
  function (config:InternalAxiosRequestConfig) {
    // Do something before request is sent
    const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
    return config;
  },
  function (error:AxiosError) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response:AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response>>",response)
    const responseObject:ResponseObject = {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
    return responseObject as unknown as AxiosResponse
  },
  function (error:AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let responseError:ResponseObject = { 
      data: [],
      status: 0,
      statusText: ''
    };
    
    if(Number(error?.status) === 404){
       responseError = {
      data: [],
      status: Number(error.status),
      statusText: MSG_404
    }
    }
    console.log("error>>",error,error?.status)

    return Promise.reject(responseError);
  }
);

export default apiClient;