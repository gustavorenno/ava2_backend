const axios = require('axios');

// Função para extrair cidade de um endereço completo
const extractCity = (address) => {
  if (!address) return '';
  // Ex: "Rua das Flores, 123, Bonsucesso, Rio de Janeiro - RJ"
  const parts = address.split(',');
  const cityPart = parts[parts.length - 1].trim(); // "Rio de Janeiro - RJ"
  const city = cityPart.split('-')[0].trim(); // "Rio de Janeiro"
  return city;
};

const getWeather = async (addressOrCity) => {
  const key = process.env.OPENWEATHER_KEY;
  const city = extractCity(addressOrCity);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},BR&appid=${key}&units=metric&lang=pt_br`;

  try {
    const response = await axios.get(url);
    const weather = response.data.weather[0].main.toLowerCase();
    const temp = response.data.main.temp;

    return {
      weather,
      temp,
      alert: weather.includes('rain') ? 'Atenção: previsão de chuva!' : null
    };
  } catch (err) {
    console.error('Erro ao consultar clima:', err.message);
    return { weather: null, temp: null, alert: null };
  }
};

module.exports = getWeather;
