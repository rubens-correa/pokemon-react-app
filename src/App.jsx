import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    category: "",
    imageUrl: "",
    backgroundUrl: ""
  });

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    setLoading(true);
    axios.get('https://dev-api-teste.mandarin.com.br/pokemons')
      .then(response => {
        setPokemons(response.data);
        setCurrentPokemon(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar os pokémons!', error);
        setLoading(false);
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePokemonClick = (pokemon) => {
    setSearch(pokemon.name);
    setCurrentPokemon(pokemon);
  };


  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const updatePokemon = () => {
    if (filteredPokemons.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredPokemons.length);
      setCurrentPokemon(filteredPokemons[randomIndex]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Pokémon</h1>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
      {search && (
  <ul className="autocomplete-list">
    {filteredPokemons.map(pokemon => (
      <li
        key={pokemon.id}
        className={`autocomplete-item ${pokemon === currentPokemon ? 'selected' : ''}`}
        onClick={() => handlePokemonClick(pokemon)}
      >
        {pokemon.name}
      </li>
    ))}
  </ul>
)}

      <button onClick={updatePokemon} className="generate-button">Gerar Outro Pokémon</button>
      {currentPokemon && (
        <div className="pokemon-card" style={{ backgroundImage: `url(${currentPokemon.background_image_url})` }}>
          <img src={currentPokemon.image_url} alt={currentPokemon.name} />
          <h2>{currentPokemon.name}</h2>
          <p>{currentPokemon.category} type Pokémon.</p>
          <div className="pokemon-actions">
            <button disabled>Attack</button>
            <button disabled>Run Away</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
