import './App.css'
import responseMovies from './mocks/avengers-results.json'

function App () {
  const movies = responseMovies.Search
  const hasmovies = movies?.length > 0

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form'>
          <input type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        Search results

        {hasmovies
          ? (
            <ul>
              {
                movies.map(movie => (
                  <li key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </li>
                ))
              }
            </ul>
            )
          : (<p>No se encontraron resultados</p>)}
      </main>
    </div>
  )
}

export default App
