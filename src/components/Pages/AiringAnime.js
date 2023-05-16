import React from 'react'
import { Head } from '../Common/Header/Head.js';
import AnimeFetcher from '../Anime/Parts/AnimeFetcher.js';

function AiringAnime({ metaTitle, desc }) {

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

            <h5>Airing Anime</h5>
            <div className="anime-display anime-airing-anime-item">
                <AnimeFetcher
                    baseUrl="https://api.jikan.moe/v4"
                    endpoint="anime"
                    status="airing"
                    min_score="7"
                    type="tv"
                    limit="16"
                    keyProp="airing-anime"
                />
            </div>
        </>
    );
};

export default AiringAnime
