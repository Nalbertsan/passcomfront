import { useQuery } from "@tanstack/react-query";
import { getTravelsReq, getTicketsReq } from "../api/TravelApi";
import {useState, useContext, useEffect} from 'react'
import AuthContext from "../context/AuthContext";

export default function useTravel() {
  const {
    auth,
 } = useContext(AuthContext);
  const [email, setEmail] = useState <string>(auth?.email ||'');
  
  useEffect(() => {
    if (auth) setEmail(auth.email)
  },[auth])
 
  const getTickets = useQuery({
    queryKey: ['getTickets', email],
    queryFn: () => getTicketsReq({ email }),
  });

  const getTravels = useQuery({
    queryKey: ['getTravels'],
    queryFn: getTravelsReq,
    refetchInterval: 1000 * 1,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
  });
  
  return (
    {getTravels, getTickets, setEmail}
  )
}


