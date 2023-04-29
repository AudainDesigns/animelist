import React from 'react'
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



export const SearchAnime = ({ animelist, searchQuery, fetchtype }) => {
  return (
    <div className={`anime-display--anime-container`}>
      <h5 className='pb-2'>Searching for anime: {searchQuery}</h5>

      <div className={`anime-display anime-${fetchtype} `}>

        {animelist && animelist.map((anime) => (
          <div className={`anime-${fetchtype}-item`}
            key={anime.mal_id}
          >
            <div className="anime-trailer" >
              <div className="anime-image no-trailer">
                <LazyLoadImage
                  src={anime?.images?.webp?.large_image_url}
                  alt={anime.title_english}
                  effect="blur"
                  className="img-fluid"
                />

              </div>
            </div>
            <div className='anime-meta-container'>
              <ul className='anime-meta list-unstyled'>
                <li>
                  <h4 className='meta-item meta--item-title'>{anime.title_english ? anime.title_english : anime.title}</h4>
                  <h5 className='meta-item meta-item--jp-title'>{anime.title}</h5>
                </li>
                <li>
                  <span className='meta-item anime-year'>Year: {anime.year}</span>
                </li>
                <li>
                  <span className='meta-item anime-status'>Status: {anime.status}</span>
                </li>
                <li>
                  <span className='meta-item anime-episodes'>{anime.episodes} Episodes</span>
                </li>
                <li>
                  <span className='meta-item anime-trailer'>
                    {anime?.trailer?.url ?
                      <a href={anime?.trailer?.url} target='_blank' rel='noreferrer nofollow' className=''><BadgeHdFill color="white" size={15} /> Watch Trailer</a>
                      :
                      <a href={anime?.trailer?.url} target='_blank' rel='noreferrer nofollow' className=''><XCircle color="white" size={15} /> No Trailer Available</a>
                    }
                  </span>
                </li>
                <li>
                  <span className='meta-item anime-genre'></span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div >
    </div>
  )
}