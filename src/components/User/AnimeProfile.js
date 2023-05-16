import React, { useState, useEffect } from 'react'
import { Head } from '../Common/Header/Head.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import WatchAnime from '../Anime/WatchAnime.js';


function AnimeProfile({ metaTitle, desc }) {
  

  const [animeList, setAnimeList] = useState([]);

  //Meta Information
  const metaData = {
    metaTitle: `${metaTitle}`,
    description: `${desc}`,
    keywords: 'anime, airing',
    // cardImage: image.default
  }

  useEffect(() => {
    const savedAnimeList = JSON.parse(localStorage.getItem('animeList')) || [];
    setAnimeList(savedAnimeList);
  }, []);

  return (
    <>
      <Head {...metaData} />

      <div className='anime-display anime-watchlist-anime'>
        {animeList.map(animeData => (
          <div className={`anime-watchlist-item`} >
            <div className={`no-trailer anime-image`} >
              <WatchAnime animeClassName={`${animeData.mal_id}`} title={animeData.title_english ? animeData.title_english : animeData.title} />

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
                  <div><span className="meta-item anime-year">Year: {animeData.year}</span></div>
                  <div><span className="meta-item anime-status">Status: {animeData.status}</span></div>
                  <div><span className="meta-item anime-episodes">{animeData.episodes} Episodes </span></div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default AnimeProfile
