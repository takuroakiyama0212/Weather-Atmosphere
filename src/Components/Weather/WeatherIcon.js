import React from 'react';
import { 
  Cloud, Sun, CloudRain, CloudSnow, CloudLightning, 
  CloudDrizzle, CloudFog, Moon 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherIcon({ condition, className = "w-8 h-8", isNight = false }) {
  // Normalize condition string
  const c = condition?.toLowerCase() || '';

  const iconProps = { className };

  if (c.includes('thunder') || c.includes('storm')) {
    return (
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
        <CloudLightning {...iconProps} className={`${className} text-yellow-400`} />
      </motion.div>
    );
  }
  if (c.includes('rain') || c.includes('shower')) {
    return (
      <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <CloudRain {...iconProps} className={`${className} text-blue-400`} />
      </motion.div>
    );
  }
  if (c.includes('snow') || c.includes('ice')) {
    return (
      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
        <CloudSnow {...iconProps} className={`${className} text-cyan-200`} />
      </motion.div>
    );
  }
  if (c.includes('drizzle')) {
    return <CloudDrizzle {...iconProps} className={`${className} text-blue-300`} />;
  }
  if (c.includes('fog') || c.includes('mist')) {
    return <CloudFog {...iconProps} className={`${className} text-slate-400`} />;
  }
  if (c.includes('cloud') || c.includes('overcast')) {
    return <Cloud {...iconProps} className={`${className} text-slate-300`} />;
  }
  
  // Default to Sun or Moon
  if (isNight) {
    return <Moon {...iconProps} className={`${className} text-purple-300`} />;
  }
  
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
      <Sun {...iconProps} className={`${className} text-amber-400`} />
    </motion.div>
  );
}
