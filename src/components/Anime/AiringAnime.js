import React, { useState, useEffect } from 'react';
import { Head } from '../Common/Header/Head.js';
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player/lazy'

//Api Fetcher
import { getAnimeData } from '../../Api/AnimeApi.js';

function AiringAnime({ title, fetchtype, data, index }) {

  const [animeData, setAnimeData] = useState(data || []);

  //Meta Information
  const metaData = {
    title: 'Airing Anime',
    description: 'Currently Airing Anime',
    keywords: 'anime, airing',
    // cardImage: image.default
  }

  const fallbackComponent = (
    <div className="player-wrapper">
      <iframe
        width='100%'
        height='100%'
        src=""
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getAnimeData(index);
      setAnimeData(newData?.data || []);
    };
    fetchData();
  }, [index]);

  return (
    <>
      <Head {...metaData} />

      <div className={`anime-display--anime-container`}>
        {/*Featured Check*/}
        {fetchtype === "featured" ? (
          null
        ) : (
          <h5 className='pb-2'>{title}</h5>
        )}

        <div className={`anime-display anime-${fetchtype} `}>

          {/*Start loop*/}

          <div className={`anime-${fetchtype}-item`}
          //key={anime.mal_id} 
          >

            <div className={`${fetchtype === 'featured' ? 'anime-trailer' : 'anime-trailer'}`} >

              {/*Featured Section*/}
              <div className={`${fetchtype === 'featured' ? 'has-trailer' : 'no-trailer'}`}>

                {animeData.map((anime) => (
                  <li key={anime.mal_id}>
                    <a href={anime.url} target="_blank" rel="noopener noreferrer">{anime.title}</a>
                  </li>
                ))}

                {/*Featured Check*/}
                <div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div >
    </>
  );
}
export default AiringAnime;

