import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import { theme } from './styles/theme';
import Home from './pages/Home';

const queryClient = new QueryClient();

const App: React.FC = () => {
  // carrega os favoritos do localStorage ao iniciar
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    const savedFavoritos = localStorage.getItem('favoritos');
    return savedFavoritos ? JSON.parse(savedFavoritos) : [];
  });

  // salva os favoritos sempre que houver alteração
  useEffect(() => {
    if (favoritos.length > 0) {
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
  }, [favoritos]);  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Home favoritos={favoritos} setFavoritos={setFavoritos} />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
