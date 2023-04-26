import React, { useEffect, useState } from 'react';

//import Button from 'react-bootstrap/Button';
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
import { SeasonalAnime } from './components/SeasonalAnime';

import { AnimeSearchTest } from './components/AnimeSearch';

function App() {

  const [search, setSearch] = useState('bleach')
  const [animeData, setAnimeData] = useState()
  const [animeFeaturedData, setAnimeFeaturedData] = useState()
  const [animeTopData, setAnimeTopData] = useState()
  const [fromCache, setFromCache] = useState(false);

  //New Api Fetch Seasonal Anime
  const [fetchAnime, setFetchAnime] = useState([]);
  const [animeSeasonal, setAnimeSeasonal] = useState([]);

  const [showAnime, setShowAnime] = useState(true);

  const [toastMessage, setToastMessage] = useState('');

  const [limit, setLimit] = useState(4);

  //const handleLoadMore = () => {
  //  setLimit(limit + 4);
  //  getData(limit + 4);
  //};

  //Seasonal Anime
  const getAnime = async () => { 

    //console.log("Anime Api Called"); 
    /*Debug
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime?q=naruto&limit=4');
      if (!response.ok) {
        throw new Error('Failed to fetch anime data');
      }
      const data = await response.json();
      //console.log('data:', data); 
      setFetchAnime(data.data);
    } catch (error) {
      console.error(error);
    }*/
  };

  //Caching
  const CACHE_EXPIRY = 3600 * 1000; // 1 hour

  const getAnimeSearchData = async () => {
    const cacheKey = 'animeSearchData';
    const cachedData = localStorage.getItem(cacheKey);
    const currentTime = new Date().getTime();

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (currentTime - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }

    const response = await fetch('https://api.jikan.moe/v4/anime?&status=airing&min_score=7&type=tv&limit=20');

    if (!response.ok) {
      throw new Error('Failed to fetch anime search data');
    }

    const data = await response.json();
    const timestamp = new Date().getTime();
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp }));

    return data;
  };

  const getSeasonal = async () => {
    //console.log("Seasonal Api Called"); /*Debug*/
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime?q=bleach&limit=4');
      if (!response.ok) {
        throw new Error('Failed to fetch anime data');
      }
      const data = await response.json();
      //console.log('data:', data); /*Debug*/
      setAnimeSeasonal(data.data);
    } catch (error) {
      console.error(error); /*Debug*/
    }
  };

  /*const getSeasonal = async () => {
    return fetch('https://api.jikan.moe/v4/anime?q=bleach&limit=4')
      .then(res => res.json())
      .then(data => {
        console.log("Seasonal Anime", data);
        setAnimeSeasonal(data);
        console.log("animeSeasonal", animeSeasonal); // add this line
      });
  }*/



  /*
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
  
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=${limit}`)
      if (!res.ok) {
        //Limit reached
        throw new Error('Too many requests!');
      }
      const resData = await res.json();
      setAnimeData(resData.data)
  
      //Debug
      console.log(resData.data)
  
    }
  
    //Get Top Anime
    const getTopData = async (limit) => {
  
      const cacheKey = `animeTopData-${limit}`;
      const cachedData = localStorage.getItem(cacheKey);
  
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}`)
      if (!res.ok) {
        //Limit reached
        throw new Error('Too many requests!');
      }
      const resData = await res.json();
      setAnimeTopData(resData.data)
  
      //Debug
      console.log(resData.data)
  
    }
  
    //Run on mount
    useEffect(() => {
      getFeatured();
      getTopData(4);
      //getData(4);
      getSeasonal().then(data => setAnimeSeasonal(data));
    }, []);
  
    //Run on search
    const handleSearch = (e) => {
      e.preventDefault();
      //Remove featured on search
      setAnimeFeaturedData(null);
      getTopData(null);
      getData(8);
      //Do not Render getTopData
      setShowAnime(false);
    };*/

  useEffect(() => {
    getSeasonal();
    getAnime();
  }, []);

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
              {/*<Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search for an anime"
                  className="anime-list--form"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-success" type="submit" >Search</Button>
              </Form>*/}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Row className='py-4'>
            <AnimeToast message={toastMessage} />

            {/*<HeroAnime animefeaturedlist={animeFeaturedData} />

            <SearchAnime animelist={animeData} />

            {showAnime && <HotAnime animetoplist={animeTopData} />}
            <Button variant="" className="btn anime-list--load-more" onClick={handleLoadMore}>Load More</Button>*/}

            <SeasonalAnime data={animeSeasonal} />

            {/*Related to the new General API*/}
            <AnimeSearchTest data={fetchAnime} />

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
