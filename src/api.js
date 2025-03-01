// src/api.js
import axios from 'axios';

const API_KEY = 'b9bd48a6';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchLatestMovies = async (page = 1) => {
  try {
    // Fetch movies from the current year (e.g., 2023)
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=2023&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};