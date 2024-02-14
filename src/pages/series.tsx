// series.tsx
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import conf from '../config';
import PosterOptions from '../types/PosterOptions';

import './series.css';

export default function Series() {
  const [error, setError] = useState<string | null>();
  const [series, setSeries] = useState<PosterOptions[] | null>();

  async function loadSeries() {
    try {
      const req = await fetch(`https://proxy.cors.sh/https://vixie-1.lucas-the-dev.repl.co/v3/series`, {
        headers: {
          'x-cors-api-key': 'temp_00c069c67cba91bf08232c134a94af65',
        },
      });
      const res = await req.json();

      if ('error' in res) {
        setSeries(null);
        setError(res.error);
        return;
      }

      if (!('data' in res)) {
        setSeries(null);
        setError('Unexpected error, please try again.');
        return;
      }

      setError(null);

      // Update the series data structure to handle genres
      const modifiedSeries = res.data.map((serie) => ({
        ...serie,
        genres: serie.genre ? [serie.genre] : [], // Create an array for genres
      }));

      setSeries(modifiedSeries);
    } catch (error) {
      console.error('Error loading series:', error.message);
      setSeries(null);
      setError('Internal Server Error');
    }
  }

  useEffect(() => {
    loadSeries();
  }, []);

  // Helper function to get unique genres
  const getUniqueGenres = () => {
    if (!series) return [];
    const allGenres = series.reduce((genres, serie) => [...genres, ...serie.genres], []);
    return Array.from(new Set(allGenres));
  };

  return (
    <Fragment>
      <Helmet>
        <title>Series - {conf.SITE_TITLE}</title>
      </Helmet>

      {error ? (
        <div className="search-center">
          <i className="fa-solid fa-warning warning"></i>
          <p>{error}</p>
        </div>
      ) : (
        (series && series.length) ? (
          <Fragment>
            {/* Render series for each unique genre in a separate row */}
            {getUniqueGenres().map((genre, index) => (
              <div key={index} className="genre-row">
                <p className="genre-title">‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ {genre}</p>
                <div className="white-line"></div>
                <div className="search-results">
                  {series
                    .filter((serie) => serie.genres.includes(genre))
                    .map((serie, serieIndex) => (
                      <Link
                        className="poster"
                        key={serieIndex}
                        title={serie.title}
                        to={`/${serie.type}/${serie.id}`}
                        style={{ backgroundImage: `url('${serie.image}')` }}
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
