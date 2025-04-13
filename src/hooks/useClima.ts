import { useQuery } from 'react-query';
import { buscarClima } from '../services/climaApi';

export const useClima = (cidade: string) => {
  return useQuery(['clima', cidade], () => buscarClima(cidade), {
    enabled: !!cidade,  
  });
};
