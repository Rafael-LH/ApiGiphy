import { API_KEY, API_URL } from './settings'

const fromApiResponseToGifs = apiResponse => {
  const { data = [] } = apiResponse
  return data
}

export default async function getTrendingTerms() {
  const apiURL = `${API_URL}/trending/searches?api_key=${API_KEY}`

  const data = await fetch(apiURL);
  const response = await data.json();
  return fromApiResponseToGifs(response)
}