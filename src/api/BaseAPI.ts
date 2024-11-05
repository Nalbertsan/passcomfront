import axios from 'axios';
import { serverAuth } from '../Utils/functions';

const baseUrl = serverAuth() as string;

export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    // "Authorization" : `Bearer ${getToken()}`
  },
  withCredentials: true,
});

export const setHeaderToken = (token: string) => {
  axiosPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete axiosPrivate.defaults.headers.common.Authorization;
};

