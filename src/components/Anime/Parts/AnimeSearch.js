import React, { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ApiThrottleContext } from './useThrottledRequest';
import { useLocation } from 'react-router-dom';
import { Head } from '../../Common/Header/Head';

import WatchAnime from '../WatchAnime';

const AnimeSearch = ({ metaTitle, desc, baseUrl, endpoint, status, filter, min_score, type, limit, sort, keyProp }) => {

    //Meta Information
    const metaData = {
        metaTitle: `${metaTitle}`,
        description: `${desc}`,
        keywords: 'anime, airing',
        // cardImage: image.default
    }

    const { incrementThrottleCount, decrementThrottleCount } = useContext(ApiThrottleContext);
    const [anime, setAnime] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');


    const fetchAnime = async () => {
        incrementThrottleCount();

        try {
            const encodedSearchQuery = encodeURIComponent(searchQuery);
            //const url = `${baseUrl}/${endpoint}?q=${encodedSearchQuery}&sort=relevant`;
            const url = `${baseUrl}/${endpoint}?q=${encodedSearchQuery}${status ? `&status=${status}` : ''}${filter ? `&filter=${filter}` : ''}${min_score ? `&min_score=${min_score}` : ''}${type ? `&type=${type}` : ''}${limit ? `&limit=${limit}` : ''}${sort ? `&sort=${sort}` : ''}`;


            const response = await fetch(url);
            const data = await response.json();

            if (response.status === 429) {
                // Rate limit reached, retry after a delay
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                await fetchAnime(); // Retry the request
            } else {
                // Request successful, update the state
                setAnime(data.data);
                console.log('API for search:', url, data);
            }
        } catch (error) {
            // Handle other errors
            console.error('Error:', error);
        }

        decrementThrottleCount();
    };


    useEffect(() => {
        fetchAnime();
    }, [searchQuery, filter, status, min_score, type, limit, sort, keyProp]);

    return (
        <>
            <Head {...metaData} />

            {anime.map((anime) => (
                <div className={`anime-airing-anime-item`} key={anime.mal_id}>

                    <div className='no-trailer' >

                        <div className="no-trailer">
                            <WatchAnime
                                title={anime.title_english ? anime.title_english : anime.title}
                                jptitle={anime.title}
                                imageUrl={anime.images.webp.large_image_url}
                                year={anime.year}
                                status={anime.status}
                                episodes={anime.episodes}
                            />


                            <LazyLoadImage
                                src={anime?.images?.webp?.large_image_url}
                                alt={anime.title_english}
                                effect="blur"
                                className="img-fluid"
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
            ))}
        </>
    );
};

export default AnimeSearch;
