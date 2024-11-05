import { axiosPrivate } from "./BaseAPI";
import { Accent} from '../Utils/Response';
import { TravelRequestDTO } from "../Utils/Types";

export const sellAccentReq = async (data: TravelRequestDTO): Promise<Accent> => {
  const response = await axiosPrivate.post<Accent>('/accent/sell/servers', data);
  return response.data;
};