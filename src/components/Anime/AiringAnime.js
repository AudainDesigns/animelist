import React, { useState, useEffect } from 'react';
import { Head } from '../Common/Header/Head.js';
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player/lazy'

//Api Fetcher
import AnimeApiData from '../../Api/AnimeApiData.js';

function AiringAnime({ title, fetchtype, apiUrlIndex }) {
  const apiUrl = API_URLS[apiUrlIndex];

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

                {/*Featured Check*/}
                <div>
                  {animeData.map((anime) => (
                    <div key={anime.mal_id}>
                      <h3>{anime.title}</h3>
                      <p>{anime.synopsis}</p>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>
      </div >
    </>
  );
}
