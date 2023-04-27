import React from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { BadgeHdFill, XCircle } from "react-bootstrap-icons";
import { Row } from 'react-bootstrap';

export const AnimeGenres = ({ animelist, searchQuery, fetchtype }) => {
  return (
    <>
    <div className={`${fetchtype}`}>
    <Row>
      <h5 className='pb-2'>Searching for anime: {searchQuery}</h5>

      {animelist && animelist.map((anime) => (
        <Col sm={12} md={6} lg={3} className="pb-4" key={anime.mal_id}>
          <div className='anime-image-wrapper--search anime-search'>
            <Card
              className='anime-image--search'
              style={{
                backgroundImage: `url(${anime?.images?.webp?.large_image_url})`,
              }}
            >
              <Card.Body
                className='anime-image--search-body'
              >
                <ul className='anime-meta list-unstyled'>
                  <li>
                    <h4 className='meta-item meta--item-title'>{anime.title_english ? anime.title_english : anime.title}</h4>
                    <h4 className='meta-item meta-item--jp-title'>{anime.title}</h4>
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
                    <span className='meta-item anime-trailer'>
                      {anime?.trailer?.url ?
                        <a href={anime?.trailer?.url} target='_blank' rel='nofollow' className=''><BadgeHdFill color="white" size={15} /> Watch Trailer</a>
                        :
                        <a href={anime?.trailer?.url} target='_blank' rel='nofollow' className=''><XCircle color="white" size={15} /> No Trailer Available</a>
                      }
                    </span>
                  </li>
                  <li>
                    <span className='meta-item anime-genre'></span>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      ))}
      </Row>
      </div>
    </>
  )
}