// Main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./styles/main.scss";

import Footer from './components/partials/Footer';
import NavBar from './components/partials/NavBar';
import Page from './components/Page';

import Index from './pages/Index';
import Movie from './pages/Movie';
import Tv from './pages/Tv';
import Search from './pages/Search';
import List from './pages/List';
import Error_ from './pages/Error';
import Player from './pages/Player';
import MovieGenreComponent from './pages/movies';
import SerieGenreComponent from './pages/series';
import Games from './pages/games';
import GamePlayer from './pages/gameplayer';
import TubiTV from './pages/plutotv';
import Downloads from './pages/downloads';

function Main(){
  return (
    <BrowserRouter>
      <NavBar />

      <Page>
        <Routes>
          {/* Existing routes */}
          <Route path='/' element={<Index />} />
          <Route path='/search' element={<Search />} />
          <Route path='/list' element={<List />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/tv/:id' element={<Tv />} />
          <Route path='/player/:id' element={<Player />} />
          <Route path="/unavailable" element={<Error_ message="The media you're looking for is unavailable, please try again later." />} />
          <Route path="/movies" element={<MovieGenreComponent/>} /> {/* New route for /movies */}
          <Route path="/series" element={<SerieGenreComponent/>} /> {/* New route for /movies */}
          <Route path="/games" element={<Games/>} /> {/* New route for /movies */}
          <Route path="/LiveTV" element={<TubiTV />} /> {/* New route for /PlutoTV */}
          <Route path="/downloads" element={<Downloads />} />
      

        
          <Route path="/gameplayer/:id" element= {<GamePlayer />} /> { }




          {/* 404 route */}
          <Route path="/*" element={<Error_ message="The page you're looking for does not exist" />} />
        </Routes>
      </Page>

      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />);
