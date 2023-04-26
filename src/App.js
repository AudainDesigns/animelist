import React, { useEffect, useState } from 'react';

//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AnimeToast from './components/AnimeToast';

//Dynamic Anime Fetch
import { AnimeFetch } from './components/AnimeFetch';
//Search Anime
import { SearchAnime } from './components/SearchAnime';


function App() {

  const [toastMessage, setToastMessage] = useState('');

  //Dynamic Anime
  const [animeData, setAnimeData] = useState([]);

  //Search Anime
  const [search, setSearch] = useState('');
  const [animeSearch, setAnimeSearch] = useState([]);
  const [searched, setSearched] = useState(false);

  const [showSearchAnime, setShowSearchAnime] = useState(false);

  //Load More
  const [limit, setLimit] = useState(4);

  //New Dynamic Api Fetch
  const API_URLS = [
    'https://api.jikan.moe/v4/anime?&status=airing&min_score=8&type=tv&limit=1',
    'https://api.jikan.moe/v4/anime?&status=airing&min_score=8&type=tv&limit=4',
    'https://api.jikan.moe/v4/top/anime?limit=4',
    'https://api.jikan.moe/v4/seasons/now?limit=4'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (const url of API_URLS) {
          let cacheKey = url;
          let cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            data.push(JSON.parse(cachedData));
            setToastMessage('Using cached data');
          } else {
            let response = await fetch(url);
            let responseData = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify(responseData));
            data.push(responseData);
          }
        }
        setAnimeData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //Search
  const getSearch = async (limit) => {

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

  //Load More
  const handleLoadMore = () => {
    setLimit(limit + 4);
    getSearch(limit + 4);
  };

  //Run on search
  const handleSearch = async (e) => {
    e.preventDefault();
    getSearch(8);
    setSearched(true);
    setShowSearchAnime(true);
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

            {toastMessage && <AnimeToast message={toastMessage} />}

            {showSearchAnime ?
              <>
              <SearchAnime searchQuery={search} animelist={animeData} />
              <Button variant="" className="btn anime-list--load-more" onClick={handleLoadMore}>Load More</Button>
              </>

              :
              <>
                <div class="anime-list--featured">
                  <AnimeFetch title="" sm="12" md="12" lg="12" data={animeData[0]?.data || []} />
                </div>
                <div class="anime-list--search">
                  <AnimeFetch title="Airing Anime" sm="12" md="6" lg="3" data={animeData[1]?.data || []} />
                  <AnimeFetch title="Top Anime" sm="12" md="6" lg="3" data={animeData[2]?.data || []} />
                  <AnimeFetch title="Seasonal Anime" sm="12" md="6" lg="3" data={animeData[3]?.data || []} />
                </div>
              </>
            }

          </Row>
        </Container>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
