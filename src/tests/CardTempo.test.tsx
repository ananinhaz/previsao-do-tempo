import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardTempo from '../components/Cardtempo';
import { buscarClima } from '../services/climaApi';  

jest.mock('../services/climaApi', () => ({
  buscarClima: jest.fn(),
}));

describe('CardTempo', () => {
  it('deve exibir o campo de pesquisa e o botão', () => {
    render(<CardTempo favoritos={[]} setFavoritos={jest.fn()} />);

    expect(screen.getByLabelText('Digite a cidade')).toBeInTheDocument();

    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  it('deve exibir dados de clima após pesquisa', async () => {
    (buscarClima as jest.Mock).mockResolvedValue({
      city: { name: 'São Paulo' },
      list: [
        { 
          main: { temp: 25, temp_max: 30, temp_min: 20 },
          weather: [{ description: 'clear sky' }],
          wind: { speed: 3 },
        },
      ],
    });

    render(<CardTempo favoritos={[]} setFavoritos={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('Digite a cidade'), { target: { value: 'São Paulo' } });
    fireEvent.click(screen.getByText('Buscar'));

    await waitFor(() => expect(screen.getByText('Clima em São Paulo')).toBeInTheDocument());

    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Máx: 30°C')).toBeInTheDocument();
    expect(screen.getByText('Mín: 20°C')).toBeInTheDocument();
    expect(screen.getByText('Vento: 3 m/s')).toBeInTheDocument();
  });

  it('deve adicionar e remover cidades dos favoritos', async () => {
    (buscarClima as jest.Mock).mockResolvedValue({
      city: { name: 'São Paulo' },
      list: [
        { 
          main: { temp: 25, temp_max: 30, temp_min: 20 },
          weather: [{ description: 'clear sky' }],
          wind: { speed: 3 },
        },
      ],
    });

    const setFavoritos = jest.fn();
    render(<CardTempo favoritos={[]} setFavoritos={setFavoritos} />);

    fireEvent.change(screen.getByLabelText('Digite a cidade'), { target: { value: 'São Paulo' } });
    fireEvent.click(screen.getByText('Buscar'));

    await waitFor(() => expect(screen.getByText('Clima em São Paulo')).toBeInTheDocument());

    const addButton = screen.getByText('Adicionar aos favoritos');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(setFavoritos).toHaveBeenCalledTimes(1);

    const removeButton = screen.getByText('Remover');
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    expect(setFavoritos).toHaveBeenCalledTimes(2);
  });
});
