import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const { search, error: searchError, setSearch } = useSearch()
  const { movies, getMovies, loading, error } = useMovies({ search })

  const err = searchError || error

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies()
    console.log({ search })
  }

  const handleChange = (e) => {
    // const newQuery = e.target.value
    // if (newQuery.startsWith(' ')) return
    setSearch(e.target.value)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='query' value={search} type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {err && <p style={{ color: 'red' }}>{err}</p>}
      </header>

      <main>
        {loading ? <p>CARGANDO</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
