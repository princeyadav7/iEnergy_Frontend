import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { fetchMovies, fetchLatestMovies } from '../api';
import MovieCard from './MovieCard';
import Loader from './Loader';
import { Grid, Typography } from '@mui/material';

const MovieList = () => {
  const {
    movies,
    latestMovies,
    loading,
    error,
    query,
    page,
    setPage,
    hasMore,
    setMovies,
    setLatestMovies,
    setHasMore,
    setLoading,
  } = useContext(MovieContext);

  // Function to load more movies for search results
  const loadMoreMovies = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const data = await fetchMovies(query, page + 1);
      if (data.Response === 'True') {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(data.totalResults > movies.length + data.Search.length);
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to load more latest movies
  const loadMoreLatestMovies = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const data = await fetchLatestMovies(page + 1);
      if (data.Response === 'True') {
        setLatestMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(data.totalResults > latestMovies.length + data.Search.length);
      }
    } catch (error) {
      console.error('Error loading more latest movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (query) {
          loadMoreMovies();
        } else {
          loadMoreLatestMovies();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, hasMore, loading, query]);

  if (error) return <div>{error}</div>;

  // Display latest movies if no search query is entered
  const moviesToDisplay = query ? movies : latestMovies;

  return (
    <div>
      {!query && (
        <Typography variant="h5" gutterBottom>
          Latest Movies
        </Typography>
      )}
      <Grid container spacing={2}>
        {moviesToDisplay.map((movie) => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {loading && <Loader />}
    </div>
  );
};

export default MovieList;