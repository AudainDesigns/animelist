import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
//import { AnimeDisplay } from '../components/Anime/AnimeDisplay';

//Api
import AiringAnime from '../components/Anime/AiringAnime';

import { TopAnime } from '../components/Anime/TopAnime';
import { SeasonalAnime } from '../components/Anime/SeasonalAnime';
import { AnimeProfile } from '../components/User/AnimeProfile'


export const Routing = () => {
    const [data, setData] = useState([]);

    return (
        <Routes>
            <Route exact path="/" element={
                //Home
                <>
                   <div className="anime-display--featured-container">
                        <AiringAnime title="Featured Anime" fetchtype="featured" index={0} />
                    </div>
                    <div className="anime-display--airing-container">
                        <AiringAnime title="Airing Anime" fetchtype="airing-anime" index={1} />
                        <AiringAnime title="Top Anime" fetchtype="top-anime" index={2} />
                        <AiringAnime title="Seasonal Anime" fetchtype="seasonal-anime" index={3} />
                    </div>
                </>
            } />
            <Route exact path="/AiringAnime" element={
                <>
                    <div className="anime-display--airing-container">
                        <AiringAnime title="Airing Anime" fetchtype="airing-anime" index={1} />
                    </div>

                </>
            } />
            <Route exact path="/TopAnime" element={
                //Home
                <>
                    <div className="anime-display--top-container">
                        <TopAnime />
                    </div>

                </>
            } />
            <Route exact path="/SeasonalAnime" element={
                //Home
                <>
                    <div className="anime-display--seasonal-container">
                        <SeasonalAnime />
                    </div>

                </>
            } />
            <Route exact path="/AnimeProfile" element={
                //Home
                <>
                    <div className="anime-display--profile-container">
                        <AnimeProfile />
                    </div>

                </>
            } />


        </Routes>
    )
}
