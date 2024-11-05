import { axiosPrivate } from "./BaseAPI";
import { TravelData } from '../Utils/Response';
import { Ticket } from "../Utils/Types";

type TicketType = {
  email: string
}

export const getTravelsReq = async (): Promise<TravelData> => {
  const response = await axiosPrivate.get<TravelData>('/travels/servers');
  return response.data;
};

export const getTicketsReq = async ({email}:TicketType): Promise<Ticket[]> => {
  const response = await axiosPrivate.get<Ticket[]>(`/travels/tickets/${email}`);
  return response.data;
};