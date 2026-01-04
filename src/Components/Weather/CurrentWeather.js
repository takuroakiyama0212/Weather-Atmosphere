import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer, Eye, Sunrise, Sunset } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

export default function CurrentWeather({ data }) {
  if (!data) return null;

  const {
    temp,
    condition,
    location,
    humidity,
    wind_speed,
    feels_like,
    visibility,
    high,
    low,
    sunrise,
    sunset
  } = data;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden group"
    >
      {/* Decorative background shine */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">Now</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {location}
            </h2>
            <p className="text-slate-400 mt-2">Feels like {Math.round(feels_like)}° | Range {Math.round(low)}° - {Math.round(high)}°</p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 rounded-2xl px-4 py-3 border border-white/10 w-full md:w-auto">
            <div className="flex items-center gap-2 text-amber-200">
              <Sunrise className="w-5 h-5" />
              <span className="text-sm text-slate-200">Sunrise {sunrise || '--'}</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2 text-blue-200">
              <Sunset className="w-5 h-5" />
              <span className="text-sm text-slate-200">Sunset {sunset || '--'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex flex-col items-center">
            <WeatherIcon condition={condition} className="w-32 h-32 md:w-40 md:h-40 mb-4" />
            <p className="text-xl text-cyan-200 capitalize font-medium tracking-wider">{condition}</p>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter leading-none">
              {Math.round(temp)}°
            </h1>
            <div className="flex items-center justify-center gap-4 mt-2 text-slate-400 text-lg">
              <span>H: {Math.round(high)}°</span>
              <span>L: {Math.round(low)}°</span>
            </div>
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full mx-auto">
          <StatItem icon={Wind} label="Wind" value={`${Math.round(wind_speed)} km/h`} />
          <StatItem icon={Droplets} label="Humidity" value={`${humidity}%`} />
          <StatItem icon={Thermometer} label="Feels Like" value={`${Math.round(feels_like)}°`} />
          <StatItem icon={Eye} label="Visibility" value={`${visibility} km`} />
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ icon: Icon, label, value }) {
  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
      <Icon className="w-5 h-5 text-cyan-400 mb-2" />
      <span className="text-slate-400 text-sm mb-1">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}
