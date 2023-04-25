import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import { HeroAnime } from './components/HeroAnime';
import { HotAnime } from './components/HotAnime';
import { SearchAnime } from './components/SearchAnime'
import AnimeToast from './components/AnimeToast';

function App() {

  const [search, setSearch] = useState('bleach')
  const [animeData, setAnimeData] = useState()
  const [animeFeaturedData, setAnimeFeaturedData] = useState()
  const [animeTopData, setAnimeTopData] = useState()
  const [fromCache, setFromCache] = useState(false);

  const [showAnime, setShowAnime] = useState(true);

  const [toastMessage, setToastMessage] = useState('');

  const [limit, setLimit] = useState(4);

  const handleLoadMore = () => {
    setLimit(limit + 4);
    getData(limit + 4);
  };

  //Hero Anime
  const getFeatured = async () => {
    const cacheKey = `animeFeaturedData`;
    const cachedData = localStorage.getItem(cacheKey);

    
      const res = await fetch(`https://api.jikan.moe/v4/anime?&status=airing&min_score=7&type=tv&limit=20`)
      if (!res.ok) {
        throw new Error('Too many requests!');
      }
      const resData = await res.json();
      const randomIndex = Math.floor(Math.random() * resData.data.length);
    const randomAnime = resData.data[randomIndex];
    setAnimeFeaturedData([randomAnime]);
      //Debug
      console.log(resData.data)
      

    
  }

  //Search Anime
  const getData = async (limit) => {

    const cacheKey = `animeData-${search}-${limit}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      //Use cached data
      setAnimeData(JSON.parse(cachedData));
      setFromCache(true);
      console.log('Using cached data for Hot Anime:', JSON.parse(cachedData));
      setToastMessage('Using cached data for Hot Anime');

    } else {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=${limit}`)
      if (!res.ok) {
        //Limit reached
        throw new Error('Too many requests!');
      }
      const resData = await res.json();
      setAnimeData(resData.data)
      //Use live data
      localStorage.setItem(cacheKey, JSON.stringify(resData.data));
      setFromCache(false);
      console.log('Using network data for Hot Anime:', resData.data);
      setToastMessage('Using network data for Hot Anime');
      //Debug
      console.log(resData.data)
    }
  }

  //Get Top Anime
  const getTopData = async (limit) => {

    const cacheKey = `animeTopData-${limit}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      //Use cached data
      setAnimeTopData(JSON.parse(cachedData));
      setFromCache(true);
      console.log('Using cached data for Hot Anime:', JSON.parse(cachedData));
      setToastMessage('Using cached data for Hot Anime');

    } else {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}`)
      if (!res.ok) {
        //Limit reached
        throw new Error('Too many requests!');
      }
      const resData = await res.json();
      setAnimeTopData(resData.data)
      //Use live data
      localStorage.setItem(cacheKey, JSON.stringify(resData.data));
      setFromCache(false);
      console.log('Using network data for Hot Anime:', resData.data);
      setToastMessage('Using network data for Hot Anime');
      //Debug
      console.log(resData.data)
    }
  }


  //Run on mount
  useEffect(() => {
    getFeatured();
    getTopData(4);
    //getData(4);
  }, []);

  //Run on search
  const handleSearch = (e) => {
    e.preventDefault();
    //Remove featured on search
    setAnimeFeaturedData(null);
    getTopData(null);
    getData(8);
    setShowAnime(false);
    

  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="" expand="lg" className="pt-5 pb-3">
          <Container>
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Browse</Nav.Link>
                <Nav.Link href="#action2">Top 100</Nav.Link>
                <Nav.Link href="#action2">Trending</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search for an anime"
                  className="anime-list--form"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/*<Button variant="outline-success" type="submit" >Search</Button>*/}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Row className='py-4'>
            <AnimeToast message={toastMessage} />
            <HeroAnime
              animefeaturedlist={animeFeaturedData} />
            {animeTopData ? (
              <>
              <h5 className='pb-2'>Top Anime</h5>
                <HotAnime animetoplist={animeTopData} />
                <Button variant="" className="btn anime-list--load-more" onClick={handleLoadMore}>Load More</Button>
              </>
            ) : (
              'No anime data available'
            )}
            {animeData ? (
              <>
              <h5 className='pb-2'>Top Anime</h5>
                <SearchAnime animelist={animeData} />
                <Button variant="" className="btn anime-list--load-more" onClick={handleLoadMore}>Load More</Button>
              </>
            ) : (
              'No anime data available'
            )}

            <Col sm={12} className="py-2">
            <h5>Airing Anime</h5>
            </Col>
            <Col sm={12} className="py-2">
            <h5>Seasonal Anime</h5>
            </Col>
          </Row>
        </Container>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
