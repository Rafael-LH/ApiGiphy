import { useState, useEffect, useRef } from 'react';

export default function useNearScreen({ distance = '100px', externalRef, once = true } = {}) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer

    const element = externalRef ? externalRef.current : fromRef.current

    const onChange = (entries, observer) => {
      const el = entries[0];
      console.log(el.isIntersecting)
      if (el.isIntersecting) {
        setShow(true);
        // esto es en caso de que solo quiera escuchar solo un intersect y nada mas, lo que hacemos es desconectar el intersect
        // con la funcion disconnect()
        once && observer.disconnect();
      } else {
        !once && setShow(false)
      }
    }
    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      const observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })
      if (element) observer.observe(element)
    })
    return () => observer && observer.disconnect()
  })

  return { isNearScreen, fromRef }
}