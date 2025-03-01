// src/components/MovieCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardMedia component="img" height="300" image={movie.Poster} alt={movie.Title} />
        <CardContent>
          <Typography variant="h6">{movie.Title}</Typography>
          <Typography variant="body2">{movie.Year}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;