import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    setSearchError(null);
  }, []);

  const value = useMemo(
    () => ({
      searchTerm,
      searchResults,
      isSearching,
      searchError,
      updateSearchTerm,
      setSearchResults,
      setIsSearching,
      setSearchError,
      clearSearch,
    }),
    [searchTerm, searchResults, isSearching, searchError, updateSearchTerm, clearSearch]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export default SearchContext;
