import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)

  const { search, error: searchError, setSearch } = useSearch()
  const { movies, getMovies, loading, error } = useMovies({ search, sort })

  const err = searchError || error

  const debouncedGetMovies = useCallback(debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 300), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
    console.log({ search })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='query' value={search} type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
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
