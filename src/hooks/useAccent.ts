import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellAccentReq } from '../api/AccentApi';

export default function useAccent() {
  const queryClient = useQueryClient();
  const mutationSellAccent = useMutation({
    mutationFn: sellAccentReq,
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: ['getTravels'] });
      await queryClient.invalidateQueries({ queryKey: ['getTickets'] });
    },
    onError: (e) => {
      console.log(e)
    },
  });
  
  return (
    {mutationSellAccent}
  )
}


