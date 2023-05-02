import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WatchList() {

  const [animeList, setAnimeList] = useState([]);

  const fetchWatchList = () => {
    const savedAnimeList = JSON.parse(localStorage.getItem("animeList")) || [];
    setAnimeList(savedAnimeList);

  }




  const [animeData, setAnimeData] = useState([]);

  const fetchWatch = () => {
    const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    console.log(animeList);
  }

  const fetchAnime = async (anime) => {
    try {
       const response = await axios.get('https://api.jikan.moe/v4/anime/21/full');
       setAnimeData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  
  };

  useEffect(() => {
    fetchWatch();
    fetchAnime();
    fetchWatchList();
  }, []);

  return (
    <div>
      <h2>Data Below</h2>

      {animeData && (
        <div>
          <h2>{animeData.title}</h2>
        </div>
      )}

  <h2>Local Below</h2>

  {animeList.map(animeData => (
        <div className={animeData.className} key={animeData.className}>
          <img src={animeData.imageUrl} alt={animeData.title} />
          <h4>{animeData.title}</h4>
        </div>
      ))}


    </div >
  );
}

export default WatchList;
