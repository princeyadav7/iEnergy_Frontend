// src/components/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api';
import { Typography, Box, CardMedia, Card, CardContent } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Card>
        {/* Movie Poster */}
        <CardMedia
          component="img"
          height="400"
          image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Poster+Available'}
          alt={movie.Title}
        />
        <CardContent>
          {/* Movie Title */}
          <Typography variant="h3" gutterBottom>
            {movie.Title}
          </Typography>

          {/* Movie Plot */}
          <Typography variant="body1" paragraph>
            {movie.Plot}
          </Typography>

          {/* Additional Details */}
          <Typography variant="body2" color="text.secondary">
            <strong>Year:</strong> {movie.Year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Director:</strong> {movie.Director}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Actors:</strong> {movie.Actors}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Genre:</strong> {movie.Genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Runtime:</strong> {movie.Runtime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>IMDb Rating:</strong> {movie.imdbRating}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetails;