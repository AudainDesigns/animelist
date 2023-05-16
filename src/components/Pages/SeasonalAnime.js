import React from 'react'
import { Head } from '../Common/Header/Head.js';
import AnimeFetcher from '../Anime/Parts/AnimeFetcher.js';

function SeasonalAnime({ metaTitle, desc }) {

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

            <h5>Seasonal Anime</h5>
            <div className="anime-display anime-seasonal-anime-item">
                <AnimeFetcher
                    baseUrl="https://api.jikan.moe/v4"
                    endpoint="seasons/now"
                    min_score="7"
                    type="tv"
                    limit="16"
                    keyProp="seasonal-anime"
                />
            </div>
        </>
    );
};

export default SeasonalAnime
