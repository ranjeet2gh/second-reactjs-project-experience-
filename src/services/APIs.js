import axios from 'axios';

export const getToken = () => localStorage.getItem('authToken');
export const setToken = (token) => localStorage.setItem('authToken', token);
export const removeToken = () => localStorage.removeItem('authToken');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',  
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem('reauthToken');
        if (refreshToken) {
          const refreshResponse = await axios.post('/employee/refresh/', {
            refresh: refreshToken,
          });

          const newAccessToken = refreshResponse.data.access;
          setToken(newAccessToken);

          
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return api.request(error.config);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        removeToken();
        window.location.href = '/login';  
      }
    }
    return Promise.reject(error);
  }
);

export const Signup = async (userData) => {
  const response = await api.post('/employee/signup/', userData);
  return response.data;
};

export const Login = async (Email, Password) => {
  const response = await api.post('/employee/login/', { email: Email, password: Password });
  const { access, refresh } = response.data;

  if (access && refresh) {
    setToken(access);
    localStorage.setItem('reauthToken', refresh);
  } else {
    throw new Error('Authentication token is missing in the response.');
  }

  return response.data;
};

export const Logout = async () => {
  const refreshToken = localStorage.getItem('reauthToken');
  const response = await api.post('/employee/logout/', { refresh: refreshToken });
  removeToken();
  localStorage.removeItem('reauthToken');
  return response.data;
};


export const CallLogs = async () => api.get('/aftercall/callrecords/');
export const fetchTotalNewCustomers = async () => api.get('/analytics/total_new_customers_today/');
export const fetchTodayTotalCalls = async () => api.get('/analytics/total_calls_today/');
export const fetchUnverifiedCustomers = async () => api.get('/analytics/unverified_customers/');
export const fetchRecentlyVerifiedCustomers = async () => api.get('/analytics/recently_verified_customers/');
export const fetchNewCustomersMonthly = async () => api.get('/analytics/new_customers_monthly/');
export const fetchVerifiedVsUnverified = async () => api.get('/analytics/verified_vs_unverified_customers/');
export const fetchCallStatus = async () => api.get('/analytics/call_status/');
