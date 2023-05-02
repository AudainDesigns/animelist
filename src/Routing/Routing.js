import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import { AnimeDisplay } from '../components/Anime/AnimeDisplay';

//Api
import AnimeDisplay from '../components/Anime/AnimeDisplay';
//import TopAnime from '../components/Anime/TopAnime';
//import SeasonalAnime from '../components/Anime/SeasonalAnime';
import AnimeProfile from '../components/User/AnimeProfile'
import WatchList from '../components/User/WatchList';


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
                        <AnimeDisplay title="Airing Anime" desc="Currently popular anime" fetchtype="airing-anime" index={1} />
                    </div>
                    <div className="anime-display--top-container">
                    <AnimeDisplay title="Top Anime" desc="Currently popular anime" fetchtype="top-anime" index={2} />
                    </div>
                    <div className="anime-display--seasonal-container">
                        <AnimeDisplay title="Seasonal Anime" desc="Anime in season" fetchtype="seasonal-anime" index={3} />
                    </div>
                </>
            } />
            <Route exact path="/AiringAnime" element={
                //Airing
                <>
                    <div className="anime-display--airing-container">
                        <AnimeDisplay title="Airing Anime" desc="Anime currently airing" fetchtype="airing-anime" index={1} />
                    </div>

                </>
            } />
            <Route exact path="/TopAnime" element={
                //Top
                <>
                    <div className="anime-display--top-container">
                    <AnimeDisplay title="Top Anime" desc="Currently popular anime" fetchtype="top-anime" index={2} />
                    </div>

                </>
            } />
            <Route exact path="/SeasonalAnime" element={
                //Seasonal
                <>
                    <div className="anime-display--seasonal-container">
                    <AnimeDisplay title="Seasonal Anime" desc="Anime in season" fetchtype="seasonal-anime" index={3} />
                    </div>

                </>
            } />
            <Route exact path="/AnimeProfile" element={
                //Profile
                <>
                    <div className="anime-display--profile-container">
                        <AnimeProfile title="User Profile" desc="Your Anime List Profile"/>
                    </div>

                </>
            } />
            <Route exact path="/Search" element={
                //Search
                <>
                    <div className="anime-display--search-container">
                        <AnimeDisplay title="Search Anime" desc="Search for an anime" fetchtype="user-search" index={5} />
                    </div>

                </>
            } />
        </Routes>
    )
}
