import { useMemo, useState, useEffect } from 'react';
import { Head } from '../Common/Header/Head.js';
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player/lazy'
import Placeholder from 'react-bootstrap/Placeholder';
import { useLocation } from 'react-router-dom';

import WatchAnime from './WatchAnime'
//import { FeaturedAnime } from './Parts/FeaturedAnime.js';



//Api Fetcher
import throttleGetAnimeData from '../../Api/AnimeApi.js';

function AnimeDisplay({ title, desc, fetchtype, data, index }) {

  const [animeData, setAnimeData] = useState(data || []);

  //Search
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q');

  //const location = useLocation();
  //const searchQuery = new URLSearchParams(location.search).get('q');

  const [isLoading, setIsLoading] = useState(true);

  //Meta Information
  const metaData = {
    title: `${title}`,
    description: { desc },
    keywords: 'anime, airing',
    // cardImage: image.default
  }

  //Run on search

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let newData = [];
      if (searchQuery) {
        newData = await throttleGetAnimeData(index, searchQuery);
      } else {
        newData = await throttleGetAnimeData(index);
      }
      setAnimeData(newData?.data || []);
      setIsLoading(false);
    };

    fetchData();
  }, [index, searchQuery]);

  //const randomAnime = animeData[Math.floor(Math.random() * animeData.length)];

  return (
    <>
      <Head {...metaData} />

      {/*Placeholder Loding*/}
      {isLoading ? (
        <div>
          {/*Featured Check*/}
          {fetchtype === "featured" ? (
            null
          ) : (
            <h5 className='pb-2'>
              <Placeholder as="p" animation="glow">
                <Placeholder lg={3} size="lg" />
              </Placeholder>
            </h5>
          )}

          <div className={`anime-display anime-${fetchtype} `}>

            {/*Start loop*/}
            <>
              <div className={`anime-${fetchtype}-item`} >

                {/*Trailer Check*/}
                {fetchtype === "featured" ?
                  <div className={`${fetchtype === 'featured' ? 'has-trailer' : 'no-trailer'}`}>

                    {/*Featured Check*/}
                    {fetchtype === "featured" ?
                      <Placeholder as="p" animation="glow" className="anime-list-loading-container">
                        <Placeholder lg={3} size="lg" className="anime-list-loading" />
                      </Placeholder>
                      :
                      <></>
                    }
                  </div>
                  :
                  <div className="anime-image">


                  </div>
                }

                {/*Regular*/}
                <div className='anime-meta-container'>
                  <div className='anime-meta list-unstyled'>
                    <div>
                      <Placeholder as="p" animation="glow">
                        <Placeholder lg={3} size="lg" /> <Placeholder lg={3} size="lg" />
                      </Placeholder>
                    </div>
                    <div>
                      <Placeholder as="p" animation="glow">
                        <Placeholder lg={2} size="sm" />
                      </Placeholder>
                    </div>
                    <div>
                      <Placeholder as="p" animation="glow">
                        <Placeholder lg={2} size="sm" />
                      </Placeholder>
                    </div>
                    <div>
                      <Placeholder as="p" animation="glow">
                        <Placeholder lg={2} size="sm" />
                      </Placeholder>
                    </div>
                  </div>
                </div>
              </div>

              {/*Featured Description*/}
              {fetchtype === "featured" ? (
                <>
                  <div className={`${fetchtype === 'featured' ? 'featured-description' : ''}`} >
                    <div className='featured-description--inner'>
                      <h4><Placeholder lg={4} size="md" /></h4>
                      <Placeholder lg={3} size="md" /> <Placeholder lg={4} size="md" /> <Placeholder lg={3} size="md" /><Placeholder lg={2} size="md" />
                      <p className='description'>
                        <br />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={12} size="md" />
                        <Placeholder lg={10} size="md" />

                      </p>
                    </div>
                  </div>

                </>

              ) : (
                null
              )}

            </>

            {/*End loop*/}

          </div>

        </div>

      ) : (

        <>
          {/*Live Content*/}
          {/*Featured Check*/}
          {fetchtype === "featured" ? (
            null
          ) : (
            <h5 className='pb-2'>{title}</h5>
          )}

          <div className={`anime-display anime-${fetchtype} `}>

            {/*Start loop*/}
            {animeData &&
              animeData.map((anime) => (
                <>

                  <div className={`anime-${fetchtype}-item anime-${anime.mal_id}`}>

                    {/*Trailer Check*/}
                    {anime?.trailer?.url ?
                      <div className={`${fetchtype === 'featured' ? 'has-trailer' : 'no-trailer'}`} key={anime.mal_id}>

                        {/*Featured Check*/}
                        {fetchtype === "featured" ?
                          <div className="player-wrapper">
                            <ReactPlayer
                              url={anime?.trailer?.url}
                              className='react-player'
                              width='100%'
                              height='100%'
                            />
                          </div>
                          :
                          <>
                            <WatchAnime animeClassName={`${anime.mal_id}`} />
                            <LazyLoadImage
                              src={anime?.images?.webp?.large_image_url}
                              alt={anime.title_english}
                              effect="blur"
                              className=''
                              threshold='200'
                            />
                          </>
                        }
                      </div>
                      :
                      <div className="no-trailer">
                        <WatchAnime animeClassName={`${anime.mal_id}`} />
                        <LazyLoadImage
                          src={anime?.images?.webp?.large_image_url}
                          alt={anime.title_english}
                          effect="blur"
                          className="img-fluid"
                        />

                      </div>
                    }

                    {/*Regular*/}
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

                        {fetchtype === "featured" && anime?.trailer?.url ? null : (
                          anime?.trailer?.url ? (
                            <div>
                              <span className="meta-item anime-trailer">
                                <a href={anime.trailer.url} target='_blank' rel='noreferrer nofollow' className=''>
                                  <BadgeHdFill color="white" size={15} /> Watch Trailer
                                </a>
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="meta-item anime-trailer">
                                <a href={anime.trailer.url} target='_blank' rel='noreferrer nofollow' className=''>
                                  <XCircle color="white" size={15} /> No Trailer Available
                                </a>
                              </span>
                            </div>
                          )
                        )}

                      </div>
                    </div>
                  </div>

                  {/*Featured Description*/}
                  {fetchtype === "featured" ? (
                    <>
                      <div className={`${fetchtype === 'featured' ? 'featured-description' : ''}`} >
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
                    </>
                  ) : (
                    null
                  )}
                </>
              ))}

            {/*End loop*/}

          </div>
        </>
      )
      }
    </>
  );
}
export default AnimeDisplay;

