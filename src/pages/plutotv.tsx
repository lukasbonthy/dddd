// PlutoTV.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import conf from '../config';

export default function PlutoTV() {
  const [loaded, setLoaded] = useState(false);

  // Additional logic to handle the loaded state when Pluto TV content is loaded
  // For example, you might have an event listener for the iframe load event
  const handlePlutoTVLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <Helmet>
        <title>Pluto TV - {conf.SITE_TITLE}</title>
      </Helmet>

      <div
        style={{
          height: '100vh', // 100% of the viewport height
          width: '100%',   // 100% of the viewport width
          position: 'relative', // Necessary for absolute positioning within
        }}
        className={`pluto-tv-container ${loaded ? 'loaded' : ''}`}
      >
        {!loaded && (
          <div
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className="loading-overlay"
          >
            <div className="loading-spinner">
              <i className="fa-solid fa-spinner-third"></i>
            </div>
          </div>
        )}

        <iframe
          title="Live TV"
          allowFullScreen
          onLoad={handlePlutoTVLoad}
          className={`pluto-tv-iframe ${loaded ? 'loaded' : ''}`}
          src="https://jauntymustyflashmemory.lucas-the-dev.repl.co/static/"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        ></iframe>

        <div
          style={{
            position: 'absolute',
            top: '0', right: '0',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="overlay"
        >

          {/* Add additional buttons or links if needed */}
          {/* Example:
          <Link to={`/someAction`}>
            <i className="fa-solid fa-some-icon"></i>
          </Link>
          */}


        </div>
      </div>
    </>
  );
}
