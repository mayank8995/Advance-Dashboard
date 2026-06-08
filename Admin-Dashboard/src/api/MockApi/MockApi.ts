import apiClient from "../http-common";
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

export const postSubmitProfileSettings = async (form: any) => {
  console.log("form>>>", form);
  try {
    const res = await apiClient.post("/profile", form);
    console.log("Created:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("API Error:", err.message);      // ← this will tell you exactly what's wrong
    console.error("Status:", err.response?.status);
    console.error("URL:", err.config?.url);
    throw err;
  }
};