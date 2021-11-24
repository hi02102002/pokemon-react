import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import DocumentationPage from './components/Page/DocumentationPage/DocumentationPage';
import LegendariesPage from './components/Page/LegendariesPage/LegendariesPage';
import PokedexPage from './components/Page/PokedexPage/PokedexPage';
import PokemonPage from './components/Page/PokemonPage/PokemonPage';
import Page404 from './components/404Page/404Page';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timeLoading = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeLoading);
    };
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Header location="/Documentation" />
          <Routes>
            <Route path="/" element={<Banner />} />
            <Route path="/Pokedex" element={<PokedexPage />} />
            <Route path="/Legendaries" element={<LegendariesPage />} />
            <Route path="/Documentation" element={<Page404 />} />
            <Route exact path="Pokedex/pokemon/:id" element={<PokemonPage />} />
          </Routes>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
