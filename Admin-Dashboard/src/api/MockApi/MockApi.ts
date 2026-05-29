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