export type ServersTravelsDTO = {
  travelId: string;
  path: string;
};

export interface TravelRequestDTO {
  serversTravels: ServersTravelsDTO[];
  email: string;
  accentNumber: number;
  origin: string;
  destination: string;
}


export type Ticket = {
  id: string;
  origin: string;
  destination: string;
  accentNumber: number;
};