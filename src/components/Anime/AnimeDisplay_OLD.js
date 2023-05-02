import { useMemo, useState, useEffect } from 'react';
import { Head } from '../Common/Header/Head.js';
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player/lazy'
import Placeholder from 'react-bootstrap/Placeholder';
import { useLocation } from 'react-router-dom';

import WatchAnime from './WatchAnime'
import { FeaturedAnime } from './Parts/FeaturedAnime.js';



//Api Fetcher
import throttleGetAnimeData from '../../Api/AnimeApi.js';

function AnimeDisplay({ title, desc, fetchtype, data, index, props }) {

  const [animeData, setAnimeData] = useState(data || []);
  const [isLoading, setIsLoading] = useState(true);

  //Search
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q');

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

  return (
    <>
      <Head {...metaData} />

      {/*Placeholder Loding*/}
      {isLoading ? (
        <div>
          Loading
        </div>

      ) : (

        <>
          {fetchtype === 'featured' ? (

            <FeaturedAnime anime={animeData[0]} />
          ) : (
            <>
              {animeList.map(animeData => (
                <RegularAnime anime={animeData[0]} />
              ))}
            </>
          )}


        </>
      )}
    </>
  );
}
export default AnimeDisplay;

