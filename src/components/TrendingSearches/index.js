import React, { Suspense } from 'react';
import useNearScreen from '../../hooks/useNearScreen'
import Spinner from '../Spinner';

// lo importamos de manera asincrona lo de react lazy
const TrendingSearches = React.lazy(
  () => import('./TrendingSearches')
)

export default function LazyTrending() {
  const { isNearScreen, fromRef } = useNearScreen();
  return <div ref={fromRef}>
    {/* fallback recibe como parametro cual quie cosa que sea renderizable */}
    <Suspense fallback={<Spinner />}>
      {isNearScreen ? <TrendingSearches /> : <Spinner />}
    </Suspense>
  </div>
}