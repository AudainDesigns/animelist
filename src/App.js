import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from './Routing/Routing';
import { Navigation } from './components/Common/Header/Navigation';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './style.scss';

function App() {

  return (
    <div className="App">
      <Container>
        <header className="App-header">
          
        </header>
        <main>
        <Router>
          <Navigation />
            <Row>
              <Routing />
            </Row>
        </Router>
        </main>
        <footer>
        </footer>
      </Container>
    </div>
  );
}

export default App;
