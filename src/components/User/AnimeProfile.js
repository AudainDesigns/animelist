import React, { useState, useEffect } from 'react'
import { Head } from '../Common/Header/Head.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import RemoveAnime from '../Anime/RemoveAnime.js';



function AnimeProfile({ title, desc }) {

  function handleRemoveAnime (title)  {
    const updatedAnimeList = animeList.filter((anime) => anime.title !== title);
    setAnimeList(updatedAnimeList);
    localStorage.setItem("animeList", JSON.stringify(updatedAnimeList));
  }

  //Meta Information
  const metaData = {
    title: `${title}`,
    description: { desc },
    keywords: 'anime, airing',
    // cardImage: image.default
  }

  //Set state for locally saved anime
  const [animeList, setAnimeList] = useState([]);
  

  //Function to get the saved anime as an array
  const fetchWatchList = () => {
    const savedAnimeList = JSON.parse(localStorage.getItem("animeList")) || [];
    setAnimeList(savedAnimeList);
  }

  useEffect(() => {

    fetchWatchList();
  }, []);

  return (
    <>
      <Head {...metaData} />


      <div>Profile</div>
      <div>

        <div className='anime-display anime-watchlist-anime'>
        {animeList.map(animeData => (
            <div className={`anime-watchlist-item`} >
              <div className={`no-trailer anime-image`} >
                <RemoveAnime/>
                <LazyLoadImage
                  src={animeData.imageUrl}
                  alt={animeData.title}
                  effect="blur"
                  className=''
                  threshold='200'
                />
              </div>
              <div className='anime-meta-container'>
                <div className="anime-meta">
                  <div>
                    <div>
                      <h4 className="meta-item meta--item-title">{animeData.title}</h4>
                      <h5 className="meta-item meta-item--jp-title">{animeData.jptitle}</h5>
                    </div>
                  </div>
                  <div>
                    <div><span className="meta-item anime-year">{animeData.year}</span></div>
                    <div><span className="meta-item anime-status">{animeData.status}</span></div>
                    <div><span className="meta-item anime-episodes">{animeData.episodes} </span></div>
                  </div>

                </div>
              </div>
            </div>
        ))}
      </div>


    </div >

    </>
  );
};

export default AnimeProfile
