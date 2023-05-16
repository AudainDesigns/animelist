import { useMemo, useState, useEffect } from 'react';
import { Head } from '../Common/Header/Head.js';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocation } from 'react-router-dom';

import { ApiThrottleProvider } from './Parts/useThrottledRequest.js';
import FeaturedAnime from './Parts/FeaturedAnime.js';
import AnimeFetcher from './Parts/AnimeFetcher.js';

function AnimeDisplay({ fetchtype, data, index }) {

  const throttleLimit = 2; // Set the throttle limit here
  //const [animeData, setAnimeData] = useState(data || []);
  const [isLoading, setIsLoading] = useState(true);

  //Search
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q');

  //Run on search
  useEffect(() => {
    setIsLoading(true);

    setIsLoading(false);

  }, [index, searchQuery]);

  return (
    <>

      {/*Placeholder Loding*/}
      {isLoading ? (
        <div>
          Loading
        </div>

      ) : (

        <>
          <ApiThrottleProvider throttleLimit={throttleLimit}>
            {fetchtype === 'featured' ? (

              <FeaturedAnime
                baseUrl="https://api.jikan.moe/v4"
                endpoint="top/anime"
                filter="airing,upcoming"
                min_score="1"
                type="tv,movie,ova"
                limit="25"
                keyProp="featured-anime"
              />

            ) : (
              <>
                <h5>Airing Anime</h5>
                <div className={`anime-display anime-airing-anime-item`}>
                  <AnimeFetcher
                    baseUrl="https://api.jikan.moe/v4"
                    endpoint="anime"
                    status="airing"
                    min_score="8"
                    type="tv"
                    limit="4"
                    keyProp="airing-anime"
                  />
                </div>
                <h5>Top Anime</h5>
                <div className={`anime-display anime-top-anime-item`}>
                  <AnimeFetcher
                    baseUrl="https://api.jikan.moe/v4"
                    endpoint="top/anime"
                    status="airing"
                    min_score="7"
                    type="tv"
                    limit="4"
                    keyProp="top-anime"
                  />
                </div>
                <h5>Seasonal Anime</h5>
                <div className={`anime-display anime-seasonal-anime-item`}>
                  <AnimeFetcher
                    baseUrl="https://api.jikan.moe/v4"
                    endpoint="seasons/now"
                    status="airing"
                    min_score="7"
                    type="tv"
                    limit="4"
                    keyProp="seasonal-anime"
                  />
                </div>

              </>
            )}
          </ApiThrottleProvider>



        </>
      )
      }
    </>
  );
}
export default AnimeDisplay;