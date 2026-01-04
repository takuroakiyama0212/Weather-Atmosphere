import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import SearchBar from '../Components/Weather/SearchBar.js';
import CurrentWeather from '../Components/Weather/CurrentWeather.js';
import ForecastList from '../Components/Weather/ForecastList.js';

import { Sparkles, RefreshCcw } from 'lucide-react';

export default function Home() {
  const [location, setLocation] = useState('Tokyo');

  const { data: weatherData, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['weather', location],
    queryFn: () => fetchWeather(location),
    enabled: Boolean(location),
    staleTime: 1000 * 60 * 15,
    retry: 1
  });

  const handleSearch = (newLocation) => {
    setLocation(newLocation.trim());
  };

  return (
    <HomeContent
      weatherData={weatherData}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      isFetching={isFetching}
      handleSearch={handleSearch}
    />
  );
}

function HomeContent({ weatherData, isLoading, error, refetch, isFetching, handleSearch }) {
  return (
    <div className="flex flex-col items-center w-full">
      <header className="w-full flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Sparkles className="text-white w-5 h-5" aria-hidden />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Weather</p>
            <span className="font-bold text-2xl tracking-tight text-white">Atmosphere</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="bg-white/5 px-3 py-1 rounded-full border border-white/5">Powered by WeatherAPI</span>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10 text-white/80 hover:bg-white/10 transition disabled:opacity-60"
          >
            <RefreshCcw className="w-4 h-4" />
            {isFetching ? 'Updating…' : 'Refresh'}
          </button>
        </div>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {error && (
        <div className="glass-panel p-6 rounded-2xl text-red-200 mb-8 border border-red-500/20 w-full max-w-4xl text-center">
          We couldn’t retrieve the latest weather data. Please try again in a moment.
          <div className="text-red-300/80 text-sm mt-2">{error.message}</div>
        </div>
      )}

      {!isLoading && weatherData ? (
        <>
          <CurrentWeather data={weatherData.current} />
          <ForecastList forecast={weatherData.forecast} />
        </>
      ) : (
        // Loading Skeleton
        isLoading && (
          <div className="w-full animate-pulse">
            <div className="h-[400px] w-full bg-white/5 rounded-3xl mb-8"></div>
            <div className="h-[200px] w-full bg-white/5 rounded-3xl"></div>
          </div>
        )
      )}
      
      {!isLoading && !weatherData && !error && (
        <div className="text-center text-slate-400 mt-12">
          <p>Search for a city to see the forecast.</p>
        </div>
      )}
    </div>
  );
}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'c374ff89138848d7902112002250412';
const FORECAST_DAYS = 3;

const fetchWeather = async (location) => {
  if (!API_KEY) {
    throw new Error('Missing WeatherAPI key. Set REACT_APP_WEATHER_API_KEY.');
  }

  const endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    location
  )}&days=${FORECAST_DAYS}&aqi=no&alerts=no`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    let message = 'Failed to fetch weather';
    try {
      const errorBody = await res.json();
      if (errorBody?.error?.message) {
        message = errorBody.error.message;
      }
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }

  const data = await res.json();
  return normalizeWeatherData(data);
};

const normalizeWeatherData = (data) => {
  const forecastDays = data.forecast?.forecastday || [];

  return {
    current: {
      location: `${data.location?.name || ''}, ${data.location?.country || ''}`,
      temp: data.current?.temp_c,
      condition: data.current?.condition?.text,
      high: forecastDays[0]?.day?.maxtemp_c,
      low: forecastDays[0]?.day?.mintemp_c,
      wind_speed: data.current?.wind_kph,
      humidity: data.current?.humidity,
      feels_like: data.current?.feelslike_c,
      visibility: data.current?.vis_km,
      sunrise: forecastDays[0]?.astro?.sunrise,
      sunset: forecastDays[0]?.astro?.sunset
    },
    forecast: forecastDays.map((day) => ({
      day_name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      temp_high: day.day?.maxtemp_c,
      temp_low: day.day?.mintemp_c,
      condition: day.day?.condition?.text
    }))
  };
};
