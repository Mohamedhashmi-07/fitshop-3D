import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearchSubmit?: (query: string) => void;
  defaultValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search shoes, smartwatches, whey protein, gym gear...',
  className = '',
  onSearchSubmit,
  defaultValue = '',
}) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(query.trim());
    } else {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearchSubmit) {
      onSearchSubmit('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder-slate-400 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
};
