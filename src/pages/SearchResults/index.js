import React, { useRef, useEffect, useCallback } from 'react'
import Spinner from '../../components/Spinner'
import ListOfGifs from '../../components/ListOfGifs'
import { useGifs } from '../../hooks/useGifs'
import useNearScreen from '../../hooks/useNearScreen'
import debounce from 'just-debounce-it'

export default function SearchResults({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
  const externalRef = useRef()
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  })

  // el useCallback recibe una dependencia
  // use callback retorna una funcion
  const debounceHandleNextPage = useCallback(debounce(
    () => setPage(prevPage => prevPage + 1), 300
  ), [])

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage()
  }, [debounceHandleNextPage, isNearScreen]) // dependencia de nuestro efecto
  console.log(loading);
  return <>
    {loading
      ? <Spinner />
      : <>
        <h3 className="App-title">{keyword}</h3>
        <ListOfGifs gifs={gifs} />
        <div id="visor" ref={externalRef}></div>
      </>
    }
  </>
}