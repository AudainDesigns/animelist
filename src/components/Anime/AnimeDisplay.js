import { useMemo, useState, useEffect } from 'react';
import { Head } from '../Common/Header/Head.js';
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player/lazy'
import Placeholder from 'react-bootstrap/Placeholder';


//Api Fetcher
import throttleGetAnimeData from '../../Api/AnimeApi.js';
//import { limitApiRequests } from '../../Api/ApiRateLimit.js';

function AnimeDisplay({ title, fetchtype, data, index }) {

  function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const [animeData, setAnimeData] = useState(data || []);

  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const newData = await throttleGetAnimeData(index);
      setAnimeData(newData?.data || []);
      setIsLoading(false);
    };

    fetchData();
  }, [index]);

  const randomAnime = animeData[Math.floor(Math.random() * animeData.length)];

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
                  <div className={`anime-${fetchtype}-item`}>

                    {/*Trailer Check*/}
                    {anime?.trailer?.url ?
                      <div className={`${fetchtype === 'featured' ? 'has-trailer' : 'no-trailer'}`}>

                        {/*Featured Check*/}
                        {fetchtype === "featured" ?
                          <div className="player-wrapper">
                            <ReactPlayer
                              url={anime?.trailer?.url}
                              className='react-player'
                              width='100%'
                              height='100%'
                              fallback={fallbackComponent}
                            />
                          </div>
                          :
                          <LazyLoadImage
                            src={anime?.images?.webp?.large_image_url}
                            alt={anime.title_english}
                            effect="blur"
                            className=''
                            threshold='200'
                          />
                        }
                      </div>
                      :
                      <div className="anime-image">
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

