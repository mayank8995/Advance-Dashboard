import apiClient from "../http-common";
import type { LoginForm, ProfileForm } from "../../types/types";
export default async function getEmployees() {
  try {
    const response = await apiClient.get('/employeeList');
         return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getAnalytics() {
  try {
    const response = await apiClient.get('/analytics');
         return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getPerformanceCards() { 
 try {
    const response = await apiClient.get('/performanceCards');
    console.log("response>>>>",response)
         return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const postSubmitProfileSettings = async (form: ProfileForm | null) => {
  console.log("form>>>", form);
  try {
    const res = await apiClient.post("/profile", form);
    console.log("Created:", res);
    return res.data;
  } catch (err: any) {
    console.error("API Error:", err.message);      // ← this will tell you exactly what's wrong
    console.error("Status:", err.response?.status);
    console.error("URL:", err.config?.url);
    throw err;
  }
};

export const getProfileData = async () => {
  try {
    const res = await apiClient.get("/profile");
    console.log("got:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("API Error:", err.message);      // ← this will tell you exactly what's wrong
    console.error("Status:", err.response?.status);
    console.error("URL:", err.config?.url);
    throw err;
  }
};

export const editProfileData = async (payload: ProfileForm | null) => {
  try {
    const res = await apiClient.put("/profile",payload);
    console.log("Edited:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("API Error:", err.message);      // ← this will tell you exactly what's wrong
    console.error("Status:", err.response?.status);
    console.error("URL:", err.config?.url);
    throw err;
  }
};

export const doLogin = async (form: LoginForm) => {
  console.log("form>>>", form);
  try {
    const res = await apiClient.post("/login", JSON.stringify(form));
    console.log("Created:", res);
    return res.data;
  } catch (err: any) {
    console.error("API Error:", err.message);      // ← this will tell you exactly what's wrong
    console.error("Status:", err.response?.status);
    console.error("URL:", err.config?.url);
    throw err;
  }
};
