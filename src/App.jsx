import { useEffect, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (search === '') {
      return setError('No se ha introducido ninguna película')
    }
    if (search.match(/\d+$/)) {
      return setError('No se puede buscar una pelicula con un numero')
    }
    if (search.length < 3) {
      return setError('La busqueda debe tener al menos 3 caracteres')
    }
    setError(null)
  }, [search])

  return { search, error, setSearch }
}

function App () {
  const { movies } = useMovies()
  const { search, error, setSearch } = useSearch()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ search })
  }

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (newQuery.startsWith(' ')) return
    console.log({ newQuery })
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
