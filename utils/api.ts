import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-api-2kyx.onrender.com',
  // You can add headers or interceptors here if needed
});

export default api;
