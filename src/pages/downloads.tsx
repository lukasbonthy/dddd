// downloads.tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import conf from '../config';

export default function Downloads() {
  return (
    <>
      <Helmet>
        <title>Downloads - {conf.SITE_TITLE}</title>
      </Helmet>

      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Downloads</h1>

        <p>Choose your platform:</p>

        <div style={{ marginTop: '20px' }}>
          <a
            href="https://apk.lukasallis-robe.repl.co/SwiflyTV.apk"
            download="SwiflyTV.apk"
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            Download for Android
          </a>
        </div>

        <div style={{ marginTop: '20px' }}>
          {/* Add additional download buttons for other platforms if needed */}
          {/* Example:
          <a
            href="./YourAppInstaller.exe"
            download="YourAppInstaller.exe"
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            Download for Windows
          </a>
          */}
        </div>

        <div style={{ marginTop: '20px' }}>
          <Link to="/">
            <i className="fa-solid fa-home"></i> Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
