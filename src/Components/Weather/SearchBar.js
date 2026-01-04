import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="relative w-full max-w-2xl mx-auto mb-10"
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city or location"
          disabled={isLoading}
          className="w-full pl-12 pr-20 py-4 rounded-2xl text-lg glass-input text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-lg"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {isLoading && (
            <div className="h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="ml-3 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:translate-y-[-1px] transition-transform disabled:opacity-70"
          >
            Search
          </button>
        </div>
      </div>
    </motion.form>
  );
}
