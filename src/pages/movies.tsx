// movies.tsx
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import conf from '../config';
import PosterOptions from '../types/PosterOptions';

import './movies.css'

export default function Movies() {
  const [error, setError] = useState<string | null>();
  const [movies, setMovies] = useState<PosterOptions[] | null>();

  async function loadMovies() {
    try {
      const req = await fetch('https://proxy.cors.sh/https://vixie-1.lucas-the-dev.repl.co/v3/movies', {
        headers: {
          'x-cors-api-key': 'temp_00c069c67cba91bf08232c134a94af65',
        },
      });
      
      const res = await req.json();

      if ('error' in res) {
        setMovies(null);
        setError(res.error);
        return;
      }

      if (!('data' in res)) {
        setMovies(null);
        setError('Unexpected error, please try again.');
        return;
      }

      setError(null);

      // Update the movies data structure to handle genres
      const modifiedMovies = res.data.map((movie) => ({
        ...movie,
        genres: movie.genre ? [movie.genre] : [], // Create an array for genres
      }));

      setMovies(modifiedMovies);
    } catch (error) {
      console.error('Error loading movies:', error.message);
      setMovies(null);
      setError('Internal Server Error');
    }
  }


  useEffect(() => {
    loadMovies();
  }, []);

  // Helper function to get unique genres
  const getUniqueGenres = () => {
    if (!movies) return [];
    const allGenres = movies.reduce((genres, movie) => [...genres, ...movie.genres], []);
    return Array.from(new Set(allGenres));
  };

  return (
    <Fragment>
      <Helmet>
        <title>Movies - {conf.SITE_TITLE}</title>
      </Helmet>

      {error ? (
        <div className="search-center">
          <i className="fa-solid fa-warning warning"></i>
          <p>{error}</p>
        </div>
      ) : (
        (movies && movies.length) ? (
          <Fragment>
            

            {/* Render movies for each unique genre in a separate row */}
            {getUniqueGenres().map((genre, index) => (
              <div key={index} className="genre-row">
                <p className="genre-title">‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ {genre}</p>
                <div className="white-line"></div>
                <div className="search-results">
                  {movies
                    .filter((movie) => movie.genres.includes(genre))
                    .map((movie, movieIndex) => (
                      <Link
                        className="poster"
                        key={movieIndex}
                        title={movie.title}
                        to={`/${movie.type}/${movie.id}`}
                        style={{ backgroundImage: `url('${movie.image}')` }}
                      ></Link>
                    ))}
                </div>
              </div>
            ))}
          </Fragment>
        ) : (
          <div className="search-center">
            <i className="fa-solid fa-camera-movie"></i>
            <p>Loading...</p>
          </div>
        )
      )}
    </Fragment>
  );
}
