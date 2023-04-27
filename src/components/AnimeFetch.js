import { useState, useEffect, useRef } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactPlayer from 'react-player/lazy'

export const AnimeFetch = ({ title, data, sm, md, lg, fetchtype }) => {

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

    const [height, setHeight] = useState(0);
    const sourceRef = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
        if (sourceRef.current && targetRef.current) {
            setHeight(sourceRef.current.offsetHeight);
            targetRef.current.style.height = `${sourceRef.current.offsetHeight}px`;
            console.log(height);
        }
    }, [sourceRef]);



    return (
        <div className='anime-list'>
            {title && <h5 className='pb-2'>{title}</h5>}

            <Row className='featured-container'>
                {data &&
                    data.map(anime => (
                        <Col
                        className={`pb-4 ${fetchtype === 'featured' ? 'featured-video' : ''}`}
                        lg={fetchtype === 'featured' ? '' : lg}
                            sm={fetchtype === 'featured' ? '' : sm}
                            md={fetchtype === 'featured' ? '' : sm}
                            key={anime.mal_id}
                        >
                            <div>

                                <div className={`anime-image-wrapper--search ${fetchtype} ${fetchtype === 'featured' ? 'has-trailer' : ''}`} >

                                    <Card
                                        className='anime-image--search'
                                        ref={sourceRef}
                                        style={{
                                            //backgroundImage: `url(${anime?.images?.webp?.large_image_url})`
                                        }}
                                    >
                                        {/*Trailer Check*/}
                                        {anime?.trailer?.url ?
                                            <>
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
                                                        className='lazy-load-img'
                                                        threshold='200'
                                                    />
                                                }
                                            </>
                                            :
                                            <>
                                                <LazyLoadImage
                                                    Src={anime?.images?.webp?.large_image_url}
                                                    Alt={anime.title_english}
                                                    effect="blur"
                                                />
                                            </>
                                        }

                                        <Card.Body className='anime-image--search-body'>
                                            <ul className='anime-meta list-unstyled'>
                                                <li>
                                                    <h4 className='meta-item meta--item-title'>{anime.title_english ? anime.title_english : anime.title}</h4>
                                                    <h4 className='meta-item meta-item--jp-title'>{anime.title}</h4>
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
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    ))}
                {data &&
                    data.map(anime => (
                        fetchtype === "featured" ? (
                            <Col
                            className={`pb-4 ${fetchtype === 'featured' ? 'featured-description' : ''}`}
                            lg={fetchtype === 'featured' ? '' : 4}
                            sm={fetchtype === 'featured' ? '' : 4}
                            md={fetchtype === 'featured' ? '' : 4}
                            key={anime.mal_id}
                        >
                                <div className='anime-list--description'>
                                    <h4>Description</h4>
                                    <ul>
                                    <li>
                                        Rank: {anime.rank}
                                        </li>
                                        <li>
                                        Popularity: {anime.popularity}
                                        </li>
                                        <li>
                                        Score: {anime.score}/10
                                        </li>
                                        <li>
                                        Favorites: {anime.favorites}
                                        </li>
                                    </ul>
                                    <p className='description' ref={targetRef}>{anime.synopsis}</p>
                                </div>
                            </Col>
                        ) : (
                            // No other content
                            null
                        )

                    ))}

            </Row>
        </div >
    )
}
