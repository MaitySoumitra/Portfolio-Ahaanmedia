// src/api/client.ts
import axios, { AxiosHeaders } from 'axios';

const client = axios.create({
  baseURL: 'https://ahaan-software-1.onrender.com/api',
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && config.headers) {
    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
  }

  return config;
});

export default client;
