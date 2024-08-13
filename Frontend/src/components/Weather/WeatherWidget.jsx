import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Weather.module.scss';
import clsx from 'clsx';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = '6ea8a711010fe51162d0a621a5efe4ec'; // Замените 'YOUR_API_KEY' на ваш API ключ от OpenWeatherMap
  const latitude = '62.7167'; // Широта для поселка Намцы
  const longitude = '129.6658'; // Долгота для поселка Намцы

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`;
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, API_KEY]);

  if (loading || !weatherData) {
    return <p>Погода загружается...</p>;
  }

  const { main, weather, wind, clouds, sys } = weatherData;

  const getWeatherIconUrl = (icon) => {
    return `https//openweathermap.org/img/wn/${icon}.png`;
  };

  return (
    <div className={styles['weather-widget']}>
      <div className={styles['weather-root']}>
      <p>{main.temp}°C</p>
      <p>{weather[0].description}</p>
      </div>
      <img className={styles['weather-icon']} src={getWeatherIconUrl(weather[0].icon)} alt={weather[0].description} />
    </div>
  );
};

export default WeatherWidget;
