import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-backend-url.com/api',
});

export const getUserDetails = (userId) => API.get(`/auth/profile/${userId}`);

// Update user profile
export const updateUserDetails = (userId, data) => API.put(`/auth/profile/${userId}`, data);
// User APIs
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);


// Loan APIs
export const getLoans = (userId) => API.get(`/loans?userId=${userId}`);
export const submitLoan = (data) => API.post('/loans', data);
export const downloadSlip = (token) => API.get(`/loans/slip/${token}`, { responseType: 'blob' });

export default API;
