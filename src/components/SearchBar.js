import React, { useState, useEffect, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { fetchMovies } from '../api';
import { debounce } from 'lodash';

const SearchBar = () => {
  const { setMovies, setLoading, setError, query, setQuery, setPage, setHasMore } = useContext(MovieContext);

  const debouncedSearch = debounce(async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const data = await fetchMovies(searchQuery);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setHasMore(data.totalResults > 10);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <input
      type="text"
      placeholder="Search for movies..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setPage(1);
      }}
    />
  );
};

export default SearchBar;