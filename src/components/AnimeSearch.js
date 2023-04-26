import React from 'react'

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';

export const AnimeSearchTest = ({data}) => {

    console.log('data:', data);

    if (!Array.isArray(data)) {
        return null; // or some other placeholder component
      }
    

    return (
        <div className='anime-list-seasonal'>
            <Row>
            <h5 className='pb-2'>Top Anime</h5>
            {data.map(anime => (
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
            ))}
            </Row>
        </div>
    );
}
