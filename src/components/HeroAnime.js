import React from 'react'

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export const HeroAnime = ({ animefeaturedlist }) => {

    if (!animefeaturedlist) {
        return null; // Do not render the component if there is no data available
    }

    const { id, attributes } = animefeaturedlist[0];

    return (
        <>
            {
                animefeaturedlist ? (
                    animefeaturedlist.map((anime, index) => {
                        return (
                            <Col sm={12} className="pb-4">
                                <div className='anime-image-wrapper--featured anime-featured'>
                                    <Row>
                                        <Col sm={12}>
                                            <Card
                                                className='anime-image--featured'
                                                style=
                                                {{
                                                    backgroundImage: `url(${anime?.trailer?.images?.maximum_image_url})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    height: "500px",
                                                    border: "none",
                                                }}
                                            >
                                                <Card.Body
                                                    className='anime-image--featured-body'
                                                >
                                                    <div class="anime-image--featured-body-meta">
                                                        <h1>{anime.title}</h1>
                                                        {/*<img src={anime?.trailer?.images?.maximum_image_url} />*/}
                                                        <ul className='anime-meta list-unstyled mx-0'>
                                                            <li>
                                                            <span className='meta-item anime-year'> {anime.year}</span>
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
                                                    </div>


                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        )
                    })
                ) : "Not Found"
            }
        </>
    )
}