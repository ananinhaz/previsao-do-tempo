import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { FaHeart, FaTemperatureHigh, FaTemperatureLow, FaThermometerHalf } from "react-icons/fa"; 
import { buscarClima } from "../services/climaApi"; 

interface CidadesFavoritasProps {
  favoritos: string[];
  setFavoritos: React.Dispatch<React.SetStateAction<string[]>>;
}

const CidadesFavoritas: React.FC<CidadesFavoritasProps> = ({ favoritos, setFavoritos }) => {
  const [dadosClimaFavoritos, setDadosClimaFavoritos] = useState<any[]>([]);

  //  busca clima de todas as cidades favoritas
  const buscarClimaDasCidadesFavoritas = useCallback(async () => {
    const climaDeFavoritos = await Promise.all(
      favoritos.map(async (cidade) => {
        const clima = await buscarClima(cidade);
        return {
          nome: cidade,
          temperatura: clima.list[0].main.temp,
          temp_max: clima.list[0].main.temp_max,
          temp_min: clima.list[0].main.temp_min,
        };
      })
    );
    setDadosClimaFavoritos(climaDeFavoritos);
  }, [favoritos]); // Adicionando 'favoritos' como dependência

  useEffect(() => {
    if (favoritos.length > 0) {
      buscarClimaDasCidadesFavoritas();
    }
  }, [favoritos, buscarClimaDasCidadesFavoritas]); // Adicionando 'buscarClimaDasCidadesFavoritas' nas dependências

  // remove cidade dos favoritos
  const removerFavorito = (cidade: string) => {
    const novosFavoritos = favoritos.filter(fav => fav !== cidade);
    setFavoritos(novosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
  };

  return (
    <Box sx={{ padding: 2, marginTop: 2, display: 'flex', justifyContent: 'center' }}>
      {/* Box com a largura reduzida e maior proximidade entre os cards */}
      <Box sx={{
        width: '100%',
        maxWidth: '1000px', 
        backgroundColor: "#1565c0",
        borderRadius: '12px',
        padding: 1, 
        boxShadow: 3,
        position: 'relative',
      }}>
        <Typography
          variant="h6" 
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 1, 
          }}
        >
          Cidades Favoritas
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {dadosClimaFavoritos.length > 0 ? (
            dadosClimaFavoritos.map((cidadeClima, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}> {/* Grid ajustado para mais largura */}
                <Card sx={{
                  marginBottom: 1,
                  boxShadow: 2,
                  borderRadius: '8px', 
                  backgroundColor: "rgba(30, 136, 229, 0.3)",
                  '&:hover': { transform: 'scale(1.03)' },
                }}>
                  <CardContent sx={{ padding: 1 }}> {/* Menor padding dentro do Card */}
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "#fff" }}>
                      {cidadeClima.nome}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                      <FaThermometerHalf size={16} color="#fff" /> {/* Ícone menor */}
                      <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                        {cidadeClima.temperatura}°C
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                      <FaTemperatureHigh size={16} color="#ff7043" /> {/* Ícone menor */}
                      <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                        Máxima: {cidadeClima.temp_max}°C
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                      <FaTemperatureLow size={16} color="#64b5f6" /> {/* Ícone menor */}
                      <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                        Mínima: {cidadeClima.temp_min}°C
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ padding: 0.5, textAlign: "center" }}> {/* Menor padding para o botão */}
                    <Button
                      onClick={() => removerFavorito(cidadeClima.nome)}
                      sx={{
                        color: "#e57373", 
                        fontSize: "0.8rem", 
                        textTransform: "none", 
                        display: "flex",  
                        alignItems: "center",  
                        '&:hover': { backgroundColor: "#1976d2", color: "#fff" },
                      }}
                    >
                      <FaHeart size={16} style={{ marginRight: 6, color: "#dc004e" }} /> {/* Cor do coração ajustada para #dc004e */}
                      Remover
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2" sx={{ color: "#fff", fontStyle: "italic" }}>
                Nenhuma cidade favorita adicionada.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CidadesFavoritas;
