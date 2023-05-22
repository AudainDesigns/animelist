import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/Pages/Home';
import AiringAnime from '../components/Pages/AiringAnime';
import TopAnime from '../components/Pages/TopAnime';
import SeasonalAnime from '../components/Pages/SeasonalAnime';
import AnimeProfile from '../components/User/AnimeProfile'
import AnimeSearch from '../components/Anime/Parts/AnimeSearch';

export const Routing = () => {

    return (
        <Routes>
            <Route exact path="/" element={
                //Home
                <>
                    <Home metaTitle="Anime List - Home" desc="Anime at your fingertips" />
                </>
            } />
            <Route exact path="/AiringAnime" element={
                //Airing
                <>
                    <AiringAnime
                        metaTitle="Anime List - Airing Anime"
                        desc="Currently airing anime"
                    />
                </>
            } />
            <Route exact path="/TopAnime" element={
                //Top
                <>
                    <TopAnime
                        metaTitle="Anime List - Top Anime"
                        desc="Currently popular anime"
                    />
                </>
            } />
            <Route exact path="/SeasonalAnime" element={
                //Seasonal
                <>
                    <SeasonalAnime
                        metaTitle="Anime List - Seasonal Anime"
                        desc="Anime from this season"
                    />

                </>
            } />
            <Route exact path="/AnimeProfile" element={
                //Profile
                <>
                    <h5>Your Profile</h5>
                    <div className="anime-display--profile-container">
                        <AnimeProfile metaTitle="Anime List - User Profile" desc="Your Anime List Profile" />
                    </div>

                </>
            } />
            <Route exact path="/Search" element={
                //Search
                <>
                    <h5>Search Anime</h5>
                    
                        <AnimeSearch
                            baseUrl="https://api.jikan.moe/v4"
                            endpoint="anime"
                            searchLimit={8}
                            keyProp="search-anime"
                            metaTitle="Anime List - Search Anime"
                        />

                </>
            } />
        </Routes>
    )
}
