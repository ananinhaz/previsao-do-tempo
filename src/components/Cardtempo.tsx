import React, { useState, createElement } from "react";
import { buscarClima } from "../services/climaApi";
import CidadesFavoritas from "./CidadesFavoritas";
import { Button, TextField, Typography, Box, Card, CardContent, Grid, CardActions, CircularProgress } from "@mui/material";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow } from "react-icons/wi";
import { FaWind, FaTemperatureHigh, FaTemperatureLow, FaRegHeart, FaHeart } from "react-icons/fa";

interface CardTempoProps {
  favoritos: string[];
  setFavoritos: React.Dispatch<React.SetStateAction<string[]>>;
}

const CardTempo: React.FC<CardTempoProps> = ({ favoritos, setFavoritos }) => {
  const [cidade, setCidade] = useState("");
  const [dadosClima, setDadosClima] = useState<any>(null);
  const [previsao, setPrevisao] = useState<any>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [cidadePesquisada, setCidadePesquisada] = useState<boolean>(false); 

  const buscarClimaCidade = async () => {
    setCarregando(true);
    try {
      const clima = await buscarClima(cidade);
      setDadosClima(clima);
      const previsaoFiltrada = clima.list.filter((item: any, index: number) => index % 8 === 0).slice(0, 3);
      setPrevisao(previsaoFiltrada);
      setCidadePesquisada(true); 
    } catch (error) {
      alert("Cidade não encontrada! Verifique o nome digitado.");
    } finally {
      setCarregando(false);
    }
  };

  const adicionarAosFavoritos = () => {
    if (dadosClima && dadosClima.city && !favoritos.includes(dadosClima.city.name)) {
      const novosFavoritos = [...favoritos, dadosClima.city.name];
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  const removerDosFavoritos = () => {
    if (dadosClima && dadosClima.city && favoritos.includes(dadosClima.city.name)) {
      const novosFavoritos = favoritos.filter((fav: string) => fav !== dadosClima.city.name);
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  const getClimaIcone = (descricao: string): JSX.Element => {
    const icones: Record<string, React.ElementType> = {
      "clear sky": WiDaySunny,
      "clouds": WiCloudy,
      "rain": WiRain,
      "thunderstorm": WiThunderstorm,
      "snow": WiSnow,
    };
    const Icone = icones[descricao.toLowerCase()] || WiCloudy;
    return createElement(Icone, { size: 30 });
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "transparent", maxWidth: "800px", margin: "0 auto" }}>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ color: "#fff", fontWeight: "bold", display: "flex", justifyContent: "center", marginBottom: 1 }}
      >
        <WiDaySunny size={40} style={{ marginRight: 8 }} />
        Previsão do Tempo
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Digite a cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ width: '50%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' }, marginRight: 1 }}
        />
        <Button
          variant="outlined"
          onClick={buscarClimaCidade}
          sx={{
            borderRadius: '8px',
            borderColor: '#3eacfa',
            color: '#3eacfa',
            padding: '6px 14px',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#01579b', color: '#fff', borderColor: '#01579b' },
          }}
        >
          {carregando ? <CircularProgress size={20} color="inherit" /> : "Buscar"}
        </Button>
      </Box>

      {dadosClima && cidadePesquisada && (
        <Box sx={{ backgroundColor: "#1565c0", borderRadius: '10px', padding: 1, boxShadow: 2, marginTop: 2 }}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 2, borderRadius: '10px', backgroundColor: "rgba(30, 136, 229, 0.3)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Clima em {dadosClima.city.name}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} textAlign="center">
                      {getClimaIcone(dadosClima.list[0].weather[0].description)}
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
                        {dadosClima.list[0].main.temp}°C
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                        <FaTemperatureHigh size={16} color="#ff7043" />
                        <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>Máx: {dadosClima.list[0].main.temp_max}°C</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                        <FaTemperatureLow size={16} color="#64b5f6" />
                        <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>Mín: {dadosClima.list[0].main.temp_min}°C</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                        <FaWind size={16} color="#fff" />
                        <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                          Vento: {dadosClima.list[0].wind.speed} m/s
                        </Typography>
                      </Box>
                      {dadosClima.list[0].rain ? (
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                          <WiRain size={16} color="#fff" />
                          <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                            Precipitação: {dadosClima.list[0].rain["3h"]} mm
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 0.5 }}>
                          <WiRain size={16} color="#fff" />
                          <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                            Sem precipitação
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={favoritos.includes(dadosClima.city.name) ? removerDosFavoritos : adicionarAosFavoritos}
                    sx={{
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      color: "#e57373",
                      fontWeight: "normal",
                      textTransform: "none",
                      '&:hover': { backgroundColor: "#1976d2", color: "#fff" },
                    }}
                  >
                    {favoritos.includes(dadosClima.city.name) ? (
                      <FaHeart size={20} style={{ marginRight: 8, color: '#dc004e' }} />
                    ) : (
                      <FaRegHeart size={20} style={{ marginRight: 8, color: '#dc004e' }} />
                    )}
                    {favoritos.includes(dadosClima.city.name) ? 'Remover' : 'Adicionar aos favoritos'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", textAlign: "center", marginBottom: 2 }}>
              Previsão para os próximos dias
            </Typography>
            {previsao.length > 0 && (
              <Grid container spacing={1} justifyContent="center">
                {previsao.map((dia: any, index: number) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Card sx={{ boxShadow: 2, borderRadius: '10px', backgroundColor: "rgba(30, 136, 229, 0.3)" }}>
                      <CardContent>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#fff" }}>
                          {new Date(dia.dt * 1000).toLocaleDateString("pt-BR")}
                        </Typography>
                        {getClimaIcone(dia.weather[0].description)}
                        <Typography variant="body2" sx={{ color: "#fff" }}>
                          <FaTemperatureHigh /> {dia.main.temp}°C
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FaTemperatureHigh size={16} color="#ff7043" />
                          <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                            Máx: {dia.main.temp_max}°C
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FaTemperatureLow size={16} color="#64b5f6" />
                          <Typography variant="body2" sx={{ color: "#fff", marginLeft: 1 }}>
                            Mín: {dia.main.temp_min}°C
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      )}

      <CidadesFavoritas favoritos={favoritos} setFavoritos={setFavoritos} />
    </Box>
  );
};

export default CardTempo;
