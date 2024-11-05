import axios from 'axios';
import { DataLogin, DataRegister } from '../Utils/Data';
import { LoginResponse } from '../Utils/Response';
import { serverAuthLogin } from '../Utils/functions';


export const loginReq = async (data: DataLogin): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${serverAuthLogin(data.server)}/auth/login`, data);
  return response.data;
};

export const registerReq = async (data: DataRegister): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${serverAuthLogin(data.server)}/auth/register`, data);
  return response.data;
};