import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BadgeHdFill } from "react-bootstrap-icons";

export const AnimeFetch = ({ title, data, sm, md, lg }) => {

    //const [isLoading, setIsLoading] = useState(true);

    return (
        <div className='anime-list'>
            {title && <h5 className='pb-2'>{title}</h5>}
            <Row>
                {data &&
                    data.map(anime => (
                        <Col sm={sm} md={md} lg={lg} className='pb-4' key={anime.mal_id}>
                            <div className='anime-image-wrapper--search anime-top'>
                                <Card
                                    className='anime-image--search'
                                    style={{
                                        backgroundImage: `url(${anime?.images?.webp?.large_image_url})`
                                    }}
                                >
                                    <Card.Body className='anime-image--search-body'>
                                        <ul className='anime-meta list-unstyled'>
                                            <li>
                                                <h4 className='meta-item meta--item-title'>{anime.title_english}</h4>
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
                                            <li>
                                                <span className='meta-item anime-trailer'>
                                                    <a href={anime?.trailer?.url} target='_blank' rel='nofollow' className=''><BadgeHdFill color="white" size={15} /> Watch Trailer</a>
                                                </span>
                                            </li>
                                            {/*<li>
                                                <span className='meta-item anime-genre'></span>
                                            </li>*/}
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    )
}
