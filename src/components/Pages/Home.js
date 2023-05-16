import React from 'react'
import { Head } from '../Common/Header/Head.js';
import AnimeDisplay from '../Anime/AnimeDisplay.js';

function Home({ metaTitle, desc }) {

  //Meta Information
  const metaData = {
    metaTitle: `${metaTitle}`,
    description: `${desc}`,
    keywords: 'anime, airing',
    // cardImage: image.default
  }


  return (
    <>
      <Head {...metaData} />

      <div className="anime-display--featured-container">
        <AnimeDisplay fetchtype="featured" />
      </div>
      <div className="anime-display--airing-container">
        <AnimeDisplay />
      </div>
    </>
  );
};

export default Home
