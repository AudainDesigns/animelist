import React from 'react'
import { Routes, Route } from 'react-router-dom';
//import { AnimeDisplay } from '../components/Anime/AnimeDisplay';
import { AiringAnime } from '../components/Anime/AiringAnime';
import { TopAnime } from '../components/Anime/TopAnime';
import { SeasonalAnime } from '../components/Anime/SeasonalAnime';
import { AnimeProfile } from '../components/User/AnimeProfile'

export const Routing = (API_URLS) => {
    return (
        <Routes>
            <Route exact path="/" element={
                //Home
                <>
                    {/*
                    <div className="anime-display--featured-container">
                        <AnimeDisplay title="" sm="12" md="12" lg="12" fetchtype="featured" />
                    </div>
                    <div className="anime-display--search-container">
                        <AnimeDisplay title="Airing Anime" fetchtype="airing-anime" data={animeData[0]?.data || []} />
                        <AnimeDisplay title="Top Anime" sm="12" md="6" lg="3" fetchtype="top-anime" data={animeData[1]?.data || []} />
                        <AnimeDisplay title="Seasonal Anime" sm="12" md="6" lg="3" fetchtype="seasonal-anime" data={animeData[3]?.data || []} />
                    </div>
                    */}
                </>
            } />
            <Route exact path="/AiringAnime" element={
                //Home

                //'https://api.jikan.moe/v4/anime?&status=airing&min_score=8&type=tv&limit=4'
                //'https://api.jikan.moe/v4/top/anime?limit=4'
                //'https://api.jikan.moe/v4/seasons/now?limit=4'
                //'https://api.jikan.moe/v4/genres/anime?limit=4'
                <>
                    <div className="anime-display--airing-container">
                        <AiringAnime title="Airing Anime" fetchtype="airing-anime" apiUrlIndex={0} />
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
