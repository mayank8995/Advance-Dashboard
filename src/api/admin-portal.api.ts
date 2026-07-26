import apiClient from '../services/http-common.service';
import type {
  FilterList,
  LoginForm,
  LoginProfile,
  ProfileForm,
  SignUpForm,
  TableQueryParams,
} from '../types/types';

export default async function getEmployees() {
  try {
    const response = await apiClient.get('/employeeList');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getTableEmployees(
  params: TableQueryParams,
  setIsLoading?: (loading: boolean) => void,
  signal?: AbortSignal
) {
  try {
    console.log('parsmasasas in get table>>', params);
    setIsLoading?.(true);
    const response = await apiClient.get('/paginatedEmployeeList', {
      params,
      signal,
    });
    setIsLoading?.(false);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    setIsLoading?.(false);
    throw error;
  }
}
export async function getFilterList(params: FilterList) {
  console.log('params>>', params);
  try {
    const response = await apiClient.get('/getFilterList', {
      params,
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getAnalytics() {
  try {
    const response = await apiClient.get('/analytics');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getPerformanceCards() {
  try {
    const response = await apiClient.get('/performanceCards');
    // console.log("response>>>>",response)
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const postSubmitProfileSettings = async (form: ProfileForm | null) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/profile', form);
    // console.log("Created:", res);
    return res;
  } catch (err: any) {
    console.error('API Error:', err.message); // ← this will tell you exactly what's wrong
    console.error('Status:', err.response?.status);
    console.error('URL:', err.config?.url);
    throw err;
  }
};

export const getProfileData = async (params: LoginProfile) => {
  try {
    const res = await apiClient.get('/profile', { params });
    // console.log("got:", res.data);
    return res;
  } catch (err: any) {
    console.error('API Error:', err.message); // ← this will tell you exactly what's wrong
    console.error('Status:', err.response?.status);
    console.error('URL:', err.config?.url);
    throw err;
  }
};

export const editProfileData = async (payload: ProfileForm | null) => {
  try {
    const res = await apiClient.patch('/profile', payload);
    // console.log("Edited:", res.data);
    return res;
  } catch (err: any) {
    console.error('API Error:', err.message); // ← this will tell you exactly what's wrong
    console.error('Status:', err.response?.status);
    console.error('URL:', err.config?.url);
    throw err;
  }
};

export const doLogin = async (form: LoginForm) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/login', JSON.stringify(form));
    // console.log("Created:", res);
    return res;
  } catch (err: any) {
    console.error('API Error:', err.message); // ← this will tell you exactly what's wrong
    console.error('Status:', err.response?.status);
    console.error('URL:', err.config?.url);
    throw err;
  }
};

export const doSignup = async (form: SignUpForm) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/signup', JSON.stringify(form));
    // console.log("Created:", res);
    return res;
  } catch (err: any) {
    console.error('API Error:', err.message); // ← this will tell you exactly what's wrong
    console.error('Status:', err.response?.status);
    console.error('URL:', err.config?.url);
    throw err;
  }
};
