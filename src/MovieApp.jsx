import { useState } from "react";

export const MovieApp = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const apiKey = "5153eba65b90a668b63dab67ad949e6e";

  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchpeliculas();
  };

  const fetchpeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${apiKey} `
      );
      const data = await response.json();
      setPeliculas(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una pelicula"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="searh-buttonn">
          Buscar
        </button>
      </form>

      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
             />
             <h2>{pelicula.title} </h2>
             <p>{pelicula.overview} </p>

          </div>
        )) }
      </div>
    </div>
  );
};
