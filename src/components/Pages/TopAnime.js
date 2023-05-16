import React from 'react'
import { Head } from '../Common/Header/Head.js';
import AnimeFetcher from '../Anime/Parts/AnimeFetcher.js';

function TopAnime({ metaTitle, desc }) {

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

            <h5>Top Anime</h5>
            <div className="anime-display anime-top-anime-item">
                <AnimeFetcher
                    baseUrl="https://api.jikan.moe/v4"
                    endpoint="top/anime"
                    filter="airing,completed"
                    min_score="7"
                    type="tv"
                    limit="16"
                    keyProp="top-anime"
                />
            </div>
        </>
    );
};

export default TopAnime
