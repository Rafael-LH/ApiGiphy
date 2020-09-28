import React, { useState, useEffect, useRef } from 'react';

export default function useNearScreen({ distance = '100px' } = {}) {
  const [isNearScreen, setIsNearScreen] = useState(false);
  const refLazyLoad = useRef();

  useEffect(() => {
    const onChange = (entries, observer) => {
      const el = entries[0];
      console.log(el.isIntersecting)
      if (el.isIntersecting) {
        setIsNearScreen(true);
        // esto es en caso de que solo quiera escuchar solo un intersect y nada mas, lo que hacemos es desconectar el intersect
        // con la funcion disconnect()
        observer.disconnect();
      }
    }
    // console.log(refLazyLoad.current)
    const observer = new IntersectionObserver(onChange, {
      rootMargin: distance
    })
    observer.observe(refLazyLoad.current)

    return () => observer.disconnect()
  })

  return { isNearScreen, refLazyLoad }
}