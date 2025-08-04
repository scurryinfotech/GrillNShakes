
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
    <input
      type="text"
      id="search"
      placeholder="Search for food items..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base shadow-sm"
    />
  </div>
);

export default SearchBar;