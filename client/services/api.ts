// // import axios from 'axios';

// // const api = axios.create({
// //   baseURL: 'http://localhost:5000/api', // Use your local IP if testing on mobile
// // });

// // // Request interceptor: Attach token to every request
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // export default api;


// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Use your server IP for physical devices
// });

// // Automatically add the token to every request
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('userToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Create the Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Use your machine's IP for physical device testing
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add the request interceptor to handle the token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Retrieve the token saved during login/registration
      const token = await AsyncStorage.getItem('userToken');
      
      if (token && config.headers) {
        // Attach the Bearer token to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;