import axios from 'axios';

const API_KEY = "7656c8fbf58e38ccf46a26ac452d9eec";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const buscarClima = async (cidade: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: cidade,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    return response.data;  // retorna os dados da previsão
  } catch (error) {
    console.error("Erro ao buscar clima:", error);
    throw new Error("Falha ao buscar dados do clima.");
  }
};
