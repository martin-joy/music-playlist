// import React from 'react';
import axios from 'axios';
// import { redirect } from 'react-router-dom';

 const instance = axios.create({
  baseURL: 'http://localhost:4003/api',
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('token');
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }
  return config;
}, error => {
  Promise.reject(error);
});

instance.interceptors.response.use(
  response => {
    return response;
  }, async (error) => {
    if (error.response.status === 403) {
      window.location.href = '/';
    }})
    
export default instance;