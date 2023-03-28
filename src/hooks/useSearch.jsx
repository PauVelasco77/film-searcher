import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
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
