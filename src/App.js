import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date,
        };
      });
      setMovies(transformMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleAddMovie = () => {
    console.log(newMovie);
    // Here you can add the new movie to your list or perform any other action
  };

  let content = <p>Found no movies.</p>;

  if (movies.length) {
    content = <moviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newMovie.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Opening Text:</label>
            <textarea
              name="openingText"
              value={newMovie.openingText}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Release Date:</label>
            <input
              type="text"
              name="releaseDate"
              value={newMovie.releaseDate}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleAddMovie}>
            Add Movie
          </button>
        </form>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
