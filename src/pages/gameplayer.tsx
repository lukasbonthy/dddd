// GamePlayer.tsx
import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import conf from '../config';

export default function GamePlayer() {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    // Additional logic to fetch game details if needed

    // Assuming you have a function to fetch game details
    async function fetchGameDetails() {
      // Fetch game details based on gameid
      // Example: const gameDetails = await fetchGameDetailsById(id);
      // Additional logic if needed

      // Set loaded to true when details are fetched
      setLoaded(true);
    }

    // Call the fetchGameDetails function
    fetchGameDetails();
  }, [id]);

  return (
    <Fragment>
      <Helmet>
        <title>Game Player - {conf.SITE_TITLE}</title>
      </Helmet>

      {!loaded && (
        <div className="loading">
          <div className="spinner">
            <i className="fa-solid fa-spinner-third"></i>
          </div>
        </div>
      )}

      <div className="player">
        {loaded && (
          <Fragment>
            {/* Replace the src attribute with your game embed URL */}
            <iframe
              allowFullScreen
              onLoad={() => setLoaded(true)}
              src={`${conf.SHUTTLE_API}/v3/game/${id}`}
            ></iframe>

            <div className="overlay">
              <Link to="/">
                <i className="fa-solid fa-home"></i>
              </Link>

              {/* Add additional buttons or links if needed */}
              {/* Example:
              <Link to={`/someAction/${id}`}>
                <i className="fa-solid fa-some-icon"></i>
              </Link>
              */}

              <Link to={`/games/${id}`}>
                <i className="fa-solid fa-close"></i>
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
