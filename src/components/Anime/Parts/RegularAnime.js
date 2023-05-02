import React from 'react'
import ReactPlayer from 'react-player/lazy'
import AnimeApi from '../../../Api/AnimeApi';


export const FeaturedAnime = ({ anime }) => {

    return (
        <>
            <h1>New Featured</h1>
            <div className={`anime-display anime-featured`}>

                <div className={`anime-featured-item anime-featured`}>

                    <div className='has-trailer' key={anime.mal_id}>

                        <div className="player-wrapper">
                            <ReactPlayer
                                url={anime?.trailer?.url}
                                className='react-player'
                                width='100%'
                                height='100%'
                            />
                        </div>
                    </div>
                    <div className='anime-meta-container'>
                        <div className='anime-meta'>
                            <div>
                                <div>
                                    <h4 className='meta-item meta--item-title'>{anime.title_english ? anime.title_english : anime.title}</h4>
                                    <h5 className='meta-item meta-item--jp-title'>{anime.title}</h5>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span className='meta-item anime-year'>Year: {anime.year}</span>
                                </div>
                                <div>
                                    <span className='meta-item anime-status'>Status: {anime.status}</span>
                                </div>
                                <div>
                                    <span className='meta-item anime-episodes'>{anime.episodes} Episodes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='featured-description'>
                    <div className='featured-description--inner'>
                        <h4>Description</h4>
                        <div>
                            <div>
                                <span> Rank: {anime.rank}</span>
                            </div>
                            <div>
                                <span>Popularity: {anime.popularity}</span>
                            </div>
                            <div>
                                <span> Score: {anime.score}/10</span>
                            </div>
                            <div>
                                <span> Favorites: {anime.favorites}</span>
                            </div>
                        </div>
                        <p className='description'>{anime.synopsis}</p>
                    </div>
                </div>

            </div >
        </>
    );
}
