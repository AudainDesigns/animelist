import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function WatchList() {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    axios.get('https://api.jikan.moe/v4/anime/21')
      .then((res) => setAnimeData(res.data));
  }, []);

  console.log(animeData);

  return (
    <div>
      <h2>Data Below</h2>

      <>
        {animeData.data.title}
      </>

      <div>
        <h2>{animeData.data.title}</h2>
        <p>{animeData.data.synopsis}</p>
      </div>
    </div >
  );
}