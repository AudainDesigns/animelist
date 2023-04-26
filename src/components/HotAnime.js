import React from 'react'

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export const HotAnime = ({ animetoplist }) => {

    if (!animetoplist) {
        return null; // Do not render the component if there is no data available
    }

    const { id, attributes } = animetoplist[0];

    return (
        <>
            <div>
                <h5 className='pb-2'>Top Anime</h5>
            </div>
            {
                animetoplist ? (
                    animetoplist.map((anime, index) => {
                        return (
                            <Col sm={12} md={6} lg={3} className="pb-4">

                                <div className='anime-image-wrapper--search anime-top'>
                                    <Card
                                        className='anime-image--search'
                                        style=
                                        {{
                                            backgroundImage: `url(${anime?.images?.webp?.large_image_url})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            height: "480px",
                                            border: "none",
                                        }}
                                    >
                                        <Card.Body
                                            className='anime-image--search-body'
                                        >
                                            <ul className='anime-meta list-unstyled'>
                                                <li>
                                                    <h4 className='meta-item '>{anime.title}</h4>
                                                </li>
                                                <li>
                                                    <span className='meta-item anime-year'>{anime.year}</span>
                                                </li>
                                                <li>
                                                    <span className='meta-item anime-status'>{anime.status}</span>
                                                </li>
                                                <li>
                                                    <span className='meta-item anime-episodes'>{anime.episodes} Episodes</span>
                                                </li>
                                                <li>
                                                    <span className='meta-item anime-genre'></span>
                                                </li>
                                            </ul>

                                        </Card.Body>
                                    </Card>
                                </div>
                                {/*<div>
                                    <Button variant="" className="btn anime-list--load-more" onClick={handleLoadMore}>Load More</Button>
                                    </div>*/}
                            </Col>
                        )
                    })
                ) : "Not Found"
            }
        </>
    )
}