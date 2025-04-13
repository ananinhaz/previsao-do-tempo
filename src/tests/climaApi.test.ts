import axios from 'axios';
import { buscarClima } from '../services/climaApi';

jest.mock('axios');

describe('buscarClima', () => {
  it('deve retornar os dados de clima corretamente', async () => {
    const mockResponse = {
      data: {
        city: { name: 'São Paulo' },
        list: [
          { 
            main: { temp: 25, temp_max: 30, temp_min: 20 },
            weather: [{ description: 'clear sky' }],
            wind: { speed: 3 },
          },
        ],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const clima = await buscarClima('São Paulo');
    expect(clima.city.name).toBe('São Paulo');
    expect(clima.list[0].main.temp).toBe(25);
  });

  it('deve lançar um erro caso a API falhe', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Falha ao buscar dados do clima'));

    await expect(buscarClima('São Paulo')).rejects.toThrow('Falha ao buscar dados do clima');
  });
});
