import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
//import { AnimeDisplay } from '../components/Anime/AnimeDisplay';

//Api
import AnimeDisplay from '../components/Anime/AnimeDisplay';

import { TopAnime } from '../components/Anime/TopAnime';
import { SeasonalAnime } from '../components/Anime/SeasonalAnime';
import { AnimeProfile } from '../components/User/AnimeProfile'


export const Routing = () => {
    //const [data, setData] = useState([]);

    return (
        <Routes>
            <Route exact path="/" element={
                //Home
                <>
                    <div className="anime-display--featured-container">
                        <AnimeDisplay title="Featured Anime" fetchtype="featured" index={0} />
                    </div>
                    <div className="anime-display--airing-container">
                        <AnimeDisplay title="Airing Anime" fetchtype="airing-anime" index={1} />
                    </div>
                    <div className="anime-display--top-container">
                        <AnimeDisplay title="Top Anime" fetchtype="top-anime" index={2} />
                    </div>
                    <div className="anime-display--seasonal-container">
                        <AnimeDisplay title="Seasonal Anime" fetchtype="seasonal-anime" index={3} />
                    </div>
                </>
            } />
            <Route exact path="/AiringAnime" element={
                //Airing
                <>
                    <div className="anime-display--airing-container">
                        <AnimeDisplay title="Airing Anime" fetchtype="airing-anime" index={1} />
                    </div>

                </>
            } />
            <Route exact path="/TopAnime" element={
                //Top
                <>
                    <div className="anime-display--top-container">
                        <AnimeDisplay title="Top Anime" fetchtype="top-anime" index={2} />
                    </div>

                </>
            } />
            <Route exact path="/SeasonalAnime" element={
                //Seasonal
                <>
                    <div className="anime-display--seasonal-container">
                        <AnimeDisplay title="Seasonal Anime" fetchtype="seasonal-anime" index={3} />
                    </div>

                </>
            } />
            <Route exact path="/AnimeProfile" element={
                //Profile
                <>
                    <div className="anime-display--profile-container">
                        <AnimeProfile />
                    </div>

                </>
            } />


        </Routes>
    )
}
