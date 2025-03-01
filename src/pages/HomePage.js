// src/pages/HomePage.jsx
import React, { useEffect, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { fetchLatestMovies } from '../api';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  const { setLatestMovies, setLoading, setError } = useContext(MovieContext);

  // Fetch latest movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchLatestMovies();
        if (data.Response === 'True') {
          setLatestMovies(data.Search);
        } else {
          setError(data.Error);
        }
      } catch (error) {
        setError('Failed to fetch latest movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [setLatestMovies, setLoading, setError]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Latest Movies
      </Typography>
      <SearchBar />
      <MovieList />
    </Container>
  );
};

export default HomePage;