import axios from 'axios';
import {CONFIG} from '../config/config';

const axiosInstance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 全域攔截 response
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);

    // 統一包成格式化錯誤
    const formattedError = {
      message:
        error.response?.data?.message || error.message || 'Unknown error',
      status: error.response?.status || 500,
    };
    return Promise.reject(formattedError);
  },
);

// catch、統一錯誤格式
async function apiWrapper<T>(apiCall: Promise<{data: T}>): Promise<T> {
  try {
    const response = await apiCall;
    return response.data;
  } catch (error) {
    console.error('API Wrapper caught error:', error);
    throw error;
  }
}

export {apiWrapper};
export default axiosInstance;
