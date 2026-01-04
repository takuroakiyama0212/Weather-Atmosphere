import React from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Upcoming</p>
          <h3 className="text-xl font-semibold text-slate-100">{forecast.length}-Day Forecast</h3>
        </div>
        <p className="text-xs text-slate-500">Daily highs / lows</p>
      </div>
      
      <div className="glass-panel rounded-3xl p-6 overflow-x-auto hide-scrollbar border border-white/5">
        <div className="flex md:grid md:grid-cols-7 gap-4 min-w-max md:min-w-0">
          {forecast.map((day, index) => (
            <ForecastItem key={index} day={day} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ForecastItem({ day, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center justify-between p-4 rounded-2xl min-w-[120px] h-52 hover:bg-white/5 transition-colors border border-white/5"
    >
      <span className="text-slate-300 font-medium">{day.day_name}</span>
      
      <div className="flex flex-col items-center gap-2 my-2">
        <WeatherIcon condition={day.condition} className="w-12 h-12" />
        <span className="text-xs text-cyan-100/80 text-center px-1 leading-tight">
          {day.condition}
        </span>
      </div>

      <div className="flex flex-col items-center w-full gap-1">
        <span className="text-2xl font-bold text-white">{Math.round(day.temp_high)}°</span>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            style={{ width: `${Math.min(100, Math.max(30, (day.temp_high / 40) * 100))}%` }}
          />
        </div>
        <span className="text-sm text-slate-500">Low {Math.round(day.temp_low)}°</span>
      </div>
    </motion.div>
  );
}
