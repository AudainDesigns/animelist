import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player/lazy'

export const AnimeFetch = ({ title, data, fetchtype }) => {


    const fallbackComponent = (
        <div className="player-wrapper">
            <iframe
                width='100%'
                height='100%'
                src=""
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );

    return (
        <div className={`anime-display--anime-container`}>
            {title && <h5 className='pb-2'>{title}</h5>}

            <div
                className={`anime-display anime-${fetchtype} `}>
                {data &&
                    data.map(anime => (

                        <div className={`anime-${fetchtype}-item`}
                            key={anime.mal_id}
                        >
                            <div className={`${fetchtype === 'featured' ? 'anime-trailer' : 'anime-trailer'}`} >

                                {/*Trailer Check*/}
                                {anime?.trailer?.url ?
                                    <div className={`${fetchtype === 'featured' ? 'has-trailer' : 'no-trailer'}`}>
                                        {/*Featured Check*/}
                                        {fetchtype === "featured" ?
                                            <div className="player-wrapper">
                                                <ReactPlayer
                                                    url={anime?.trailer?.url}
                                                    className='react-player'
                                                    width='100%'
                                                    height='100%'
                                                    fallback={fallbackComponent}
                                                />
                                            </div>
                                            :
                                            <LazyLoadImage
                                                src={anime?.images?.webp?.large_image_url}
                                                alt={anime.title_english}
                                                effect="blur"
                                                className=''
                                                threshold='200'
                                            />
                                        }
                                    </div>
                                    :
                                    <div className="anime-image">
                                        <LazyLoadImage
                                            src={anime?.images?.webp?.large_image_url}
                                            alt={anime.title_english}
                                            effect="blur"
                                            className="img-fluid"
                                        />

                                    </div>
                                }

                                <div className='anime-meta-container'>
                                    <ul className='anime-meta list-unstyled'>
                                        <li>
                                            <h4 className='meta-item meta--item-title'>{anime.title_english ? anime.title_english : anime.title}</h4>
                                            <h5 className='meta-item meta-item--jp-title'>{anime.title}</h5>
                                        </li>
                                        <li>
                                            <span className='meta-item anime-year'>Year: {anime.year}</span>
                                        </li>
                                        <li>
                                            <span className='meta-item anime-status'>Status: {anime.status}</span>
                                        </li>
                                        <li>
                                            <span className='meta-item anime-episodes'>{anime.episodes} Episodes</span>
                                        </li>

                                        {fetchtype === "featured" && anime?.trailer?.url ? null : (
                                            anime?.trailer?.url ? (
                                                <li>
                                                    <span className="meta-item anime-trailer">
                                                        <a href={anime.trailer.url} target='_blank' rel='noreferrer nofollow' className=''>
                                                            <BadgeHdFill color="white" size={15} /> Watch Trailer
                                                        </a>
                                                    </span>
                                                </li>
                                            ) : (
                                                <li>
                                                    <span className="meta-item anime-trailer">
                                                        <a href={anime.trailer.url} target='_blank' rel='noreferrer nofollow' className=''>
                                                            <XCircle color="white" size={15} /> No Trailer Available
                                                        </a>
                                                    </span>
                                                </li>
                                            )
                                        )}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                {data &&
                    data.map(anime => (
                        fetchtype === "featured" ? (
                            <div
                                className={`${fetchtype === 'featured' ? 'featured-description' : ''}`}
                                lg={fetchtype === 'featured' ? '' : 4}
                                sm={fetchtype === 'featured' ? '' : 4}
                                md={fetchtype === 'featured' ? '' : 4}
                                key={anime.mal_id}
                            >
                                <div className='featured-description--inner'>
                                    <h4>Description</h4>
                                    <ul className='list-unstyled'>
                                        <li>
                                            <span> Rank: {anime.rank}</span>
                                        </li>
                                        <li>
                                            <span>Popularity: {anime.popularity}</span>
                                        </li>
                                        <li>
                                            <span> Score: {anime.score}/10</span>
                                        </li>
                                        <li>
                                            <span> Favorites: {anime.favorites}</span>
                                        </li>
                                    </ul>
                                    <p className='description'>{anime.synopsis}</p>
                                </div>
                            </div>
                        ) : (
                            // No other content
                            null
                        )

                    ))}

            </div>
        </div >
    )
}
