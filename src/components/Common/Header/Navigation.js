import React from 'react'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export const Navigation = () => {
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
                //onSubmit={handleSearch}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search for an anime"
                    className="anime-list--form"
                    aria-label="Search"
                    //onChange={(e) => setSearch(e.target.value)}
                  />
                  {/*<Button variant="outline-success" type="submit" >Search</Button>*/}
                </Form>
                <NavDropdown align={{ lg: 'end' }} title="Profile" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/AnimeProfile">
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

            </Navbar.Collapse>
          </Navbar>
    </div>
  )
}
