import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CidadesFavoritas from '../components/CidadesFavoritas';
import { buscarClima } from '../services/climaApi';

jest.mock('../services/climaApi', () => ({
  buscarClima: jest.fn(),
}));

describe('CidadesFavoritas', () => {
  it('deve exibir as cidades favoritas e dados de clima', async () => {
    (buscarClima as jest.Mock).mockResolvedValue({
      list: [
        { 
          main: { temp: 25, temp_max: 30, temp_min: 20 },
          weather: [{ description: 'clear sky' }],
        },
      ],
    });

    const favoritos = ['São Paulo'];

    render(<CidadesFavoritas favoritos={favoritos} setFavoritos={jest.fn()} />);

    await waitFor(() => screen.getByText('São Paulo'));

    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Máxima: 30°C')).toBeInTheDocument();
    expect(screen.getByText('Mínima: 20°C')).toBeInTheDocument();
  });

  it('deve remover a cidade favorita', async () => {
    const setFavoritos = jest.fn();
    const favoritos = ['São Paulo'];

    render(<CidadesFavoritas favoritos={favoritos} setFavoritos={setFavoritos} />);

    await waitFor(() => screen.getByText('Remover'));

    fireEvent.click(screen.getByText('Remover'));

    expect(setFavoritos).toHaveBeenCalledTimes(1);
  });
});
