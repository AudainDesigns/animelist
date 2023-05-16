import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy'
import { ApiThrottleContext } from './useThrottledRequest';

const FeaturedAnime = ({ baseUrl, endpoint, status, min_score, filter, limit, keyProp }) => {
    const { incrementThrottleCount, decrementThrottleCount } = useContext(ApiThrottleContext);
    const [anime, setAnime] = useState([]);

    const fetchAnime = async () => {
        incrementThrottleCount();

        try {
            const url = `${baseUrl}/${endpoint}?status=${status}&min_score=${min_score}&filter=${filter}&limit=${limit}`;
            const response = await fetch(url);
            const data = await response.json();

            if (response.status === 429) {
                // Rate limit reached, retry after a delay
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                await fetchAnime(); // Retry the request
              } else {
                const animeWithTrailer = data.data.filter(anime => anime.trailer?.url);
                if (animeWithTrailer.length > 0) {
                  const randomIndex = Math.floor(Math.random() * animeWithTrailer.length);
                  const randomAnime = animeWithTrailer[randomIndex];
                  setAnime([randomAnime]);
                } else {
                  setAnime([]);
                }
                console.log('API for', `${keyProp}:`, url, data);
              }
            } catch (error) {
              // Handle other errors
              console.error('Error:', error);
            }
        
        decrementThrottleCount();
    };

    useEffect(() => {
        fetchAnime();
    }, [status, min_score, filter, limit, keyProp]);


    return (
        <>
            {anime.map((anime) => (
                <div className={`anime-display anime-featured`} key={anime.mal_id}>

                    <div className={`anime-featured-item anime-featured`}>

                        <div className='has-trailer'>

                            <div className="player-wrapper">
                                <ReactPlayer
                                    url={anime?.trailer?.url}
                                    className='react-player'
                                    width='100%'
                                    height='100%'
                                />
                            </div>
                        </div>
                        <div className='anime-meta-container'>
                            <div className='anime-meta'>
                                <div>
                                    <div>
                                        <h4 className='meta-item meta--item-title'>{anime.title_english ? anime.title_english : anime.title}</h4>
                                        <h5 className='meta-item meta-item--jp-title'>{anime.title}</h5>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span className='meta-item anime-year'>Year: {anime.year}</span>
                                    </div>
                                    <div>
                                        <span className='meta-item anime-status'>Status: {anime.status}</span>
                                    </div>
                                    <div>
                                        <span className='meta-item anime-episodes'>{anime.episodes} Episodes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='featured-description'>
                        <div className='featured-description--inner'>
                            <h4>Description</h4>
                            <div>
                                <div>
                                    <span> Rank: {anime.rank}</span>
                                </div>
                                <div>
                                    <span>Popularity: {anime.popularity}</span>
                                </div>
                                <div>
                                    <span> Score: {anime.score}/10</span>
                                </div>
                                <div>
                                    <span> Favorites: {anime.favorites}</span>
                                </div>
                            </div>
                            <p className='description'>{anime.synopsis}</p>
                        </div>
                    </div>

                </div >
            ))}
        </>
    );
};

export default FeaturedAnime;
