import { useEffect, useState } from 'react';
import { AnimeApiFetch, API_URLS } from './AnimeApiFetch';

function AnimeApiData(index) {
  const [animeData, setAnimeData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await AnimeApiFetch(API_URLS[index]);
      setAnimeData(data);
    }
    fetchData();
  }, [index]);

  return animeData;
}

export default AnimeApiData;
