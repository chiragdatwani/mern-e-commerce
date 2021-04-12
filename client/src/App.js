import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header/';
import Product from './pages/Product'
import Footer from './components/Footer/';
import HomePage from './pages/Home';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
          <main>
            <Route path='/' exact component={HomePage} />
            <Route path='/product/:id' exact component={Product} />
          </main>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
