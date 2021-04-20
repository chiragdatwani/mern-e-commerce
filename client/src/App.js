import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header/';
import Product from './pages/Product'
import Footer from './components/Footer/';
import HomePage from './pages/Home';
import { Container } from '@material-ui/core';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
          <main>
            <Container maxWidth='lg'>
            <Route path='/' exact component={HomePage} />
            <Route path='/product/:id' exact component={Product} />
            </Container>
            <Route path='/cart/:id?' component={CartPage} />
            <Route path='/login' component={LoginPage} />
          </main>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
