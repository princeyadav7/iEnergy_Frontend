// src/context/MovieContext.js
import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        latestMovies,
        setLatestMovies,
        loading,
        setLoading,
        error,
        setError,
        query,
        setQuery,
        page,
        setPage,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};