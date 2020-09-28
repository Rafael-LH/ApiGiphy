import { useContext, useEffect, useState } from 'react'
import getGifs from '../services/getGifs'
import GifsContext from '../context/GifsContext'

const INITIAL_APGE = 0;
// recuperamos la keyword del localStorage

export function useGifs({ keyword } = { keyword: null }) {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_APGE);
  const { gifs, setGifs } = useContext(GifsContext)
  const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

  useEffect(function () {
    setLoading(true)
    getGifs({ keyword: keywordToUse })
      .then(gifs => {
        setGifs(gifs)
        setLoading(false)
        // guardamos la keyword en el localStorage
        localStorage.setItem('lastKeyword', keyword)
      })
  }, [keyword, keywordToUse, setGifs])

  useEffect(() => {
    if (page === INITIAL_APGE) return
    setLoadingNextPage(true);
    getGifs({ keyword: keywordToUse, page })
      .then(nextGifs => {
        setGifs(prevGifs => prevGifs.concat(nextGifs));
        setLoadingNextPage(false);
      })
  }, [keywordToUse, page, setGifs])

  return { loading, loadingNextPage, gifs, setPage }
}