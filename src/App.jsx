import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from './components/Header';
import CityInput from './components/CityInput';
import SearchButton from './components/SearchButton';
import WeatherResults from './components/WeatherResults';
import HistoryButton from './components/HistoryButton'

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(true);

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const res = await fetch(API_WEATHER + city);
      const data = await res.json();

      if (data.error) {
        throw { message: data.error.message };
      }

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      });

      await fetch('http://localhost:5000/api/History', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: data.location.name,
          country: data.location.country,
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
        }),
      });
    } catch (error) {
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2, position: 'absolute', left: '40vw', top: '30%'}}>
      <Header />
      <Box
        sx={{ display: 'grid', gap: 2}}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <CityInput city={city} setCity={setCity} error={error} />
        <SearchButton loading={loading} />
      </Box>
      <WeatherResults weather={weather} />
      <HistoryButton/>
      <Typography textAlign="center" sx={{ mt: 2, fontSize: '10px' }}>
        Powered by:{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
}
