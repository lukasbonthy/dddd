import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import conf from '../config';

export default function Games() {
  const [error, setError] = useState<string | null>();
  const [games, setGames] = useState<any[] | null>();

  useEffect(() => {
    async function loadGames() {
      try {
        const req = await fetch(`${conf.SHUTTLE_API}/v3/games`);
        const res = await req.json();

        if ('error' in res) {
          setGames(null);
          setError(res.error);
          return;
        }

        if (!('data' in res)) {
          setGames(null);
          setError('Unexpected error, please try again.');
          return;
        }

        setError(null);
        setGames(res.data);
      } catch (error) {
        console.error('Error loading games:', error.message);
        setGames(null);
        setError('Internal Server Error');
      }
    }

    loadGames();
  }, []);

  return (
    <div>
      {error ? (
        <div className="search-center">
          <i className="fa-solid fa-warning warning"></i>
          <p>{error}</p>
        </div>
      ) : (
        (games && games.length) ? (
          <div className="search-results">
            {games.map((game, index) => (
              <Link
                className="poster"
                key={index}
                to={`/gameplayer/${game.id}`}
                style={{ backgroundImage: `url('${game.image}')` }}
              ></Link>
            ))}
          </div>
        ) : (
          <div className="search-center">
            <i className="fa-solid fa-game-controller"></i>
            <p>No games found</p>
          </div>
        )
      )}
    </div>
  );
}
