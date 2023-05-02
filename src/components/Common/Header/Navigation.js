import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import throttleGetAnimeData from '../../../Api/AnimeApi';

export const Navigation = () => {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");


  //Search
  const handleSearch = async (event) => {
    event.preventDefault();
    navigate(`/Search?q=${searchQuery}`);
    //const searchData = await throttleGetAnimeData(5, searchQuery);
    //console.log(searchQuery);

    //event.preventDefault();
    //const searchData = await throttleGetAnimeData(1, searchQuery);
    //history.push(`/search?q=${searchQuery}`);
    
  };

  return (
    <div>
      <Navbar bg="" expand="lg" className="pt-5 pb-3">
        <Navbar.Brand as={Link} to="/">Anime List</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/AiringAnime">Airing</Nav.Link>
            <Nav.Link as={Link} to="/TopAnime">Top</Nav.Link>
            <Nav.Link as={Link} to="/SeasonalAnime">Seasonal</Nav.Link>
            <Form className="d-flex"
              onSubmit={handleSearch}
            >
              <Form.Control
                type="search"
                placeholder="Search for an anime"
                className="anime-list--form"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/*<Button variant="outline-success" type="submit" >Search</Button>*/}
            </Form>
            <Nav.Link as={Link} to="/AnimeProfile">Profile</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
