import { toast } from 'react-toastify';
import apiClient from '../services/http-common.service';
import { getApiErrorDetails } from '../services/utils.service';
import type {
  FilterList,
  LoginForm,
  LoginProfile,
  ProfileForm,
  SignUpForm,
  TableQueryParams,
} from '../types/types';
import { router } from '../main';

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
    setIsLoading?.(true);
    const response = await apiClient.get('/paginatedEmployeeList', {
      params,
      signal,
    });
    setIsLoading?.(false);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    setIsLoading?.(false);
  }
}
export async function getFilterList(params: FilterList) {
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
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const getProfileData = async (params: LoginProfile) => {
  try {
    const res = await apiClient.get('/profile', { params });
    // console.log("got:", res.data);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const editProfileData = async (payload: ProfileForm | null) => {
  try {
    const res = await apiClient.patch('/profile', payload);
    // console.log("Edited:", res.data);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const doLogin = async (form: LoginForm) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/login', JSON.stringify(form));
    // console.log("Created:", res);
    return res;
  } catch (err: unknown) {
    console.error('err>>>', err);
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const doLogout = async () => {
  try {
    await apiClient.post('/logout');
  } catch (err: unknown) {
    console.error('err>>>', err);
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  } finally {
    toast.info('Logged out!');
    router.navigate('/');
  }
};

export const doSignup = async (form: SignUpForm) => {
  // console.log("form>>>", form);
  try {
    const res = await apiClient.post('/signup', JSON.stringify(form));
    // console.log("Created:", res);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};

export const fetchEmployeeDetails = async (params: { id: number }) => {
  try {
    const res = await apiClient.get('/getEmployeeDetails', { params });
    // console.log("Created:", res);
    return res;
  } catch (err: unknown) {
    const { message, status, url } = getApiErrorDetails(err);
    console.error('API Error:', message);
    console.error('Status:', status);
    console.error('URL:', url);
    throw err;
  }
};
