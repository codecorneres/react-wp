import React, {useState,useEffect} from 'react';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './css/Test.css'; 
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import parse from 'react-html-parser';


function App() {
  const [pages, setPages]  = useState([]);
  const fetchData = async () => {
            
    const response = await fetch('http://localhost/react-wp/wp-json/wp/v2/pages');
    if(!response.ok) {
        return;
    }

    const pages = await response.json();
    setPages(pages);
    //console.log(pages);
    
};
useEffect(() => {
  fetchData();

}, []);
  
  return (
    <BrowserRouter>
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
        <div className='main-page-body-wrap'>
          <div className='container'>
            <nav className='main-nav-bar divider'>
              <ul>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/about" className="nav-link">About</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
                
              </ul>
            </nav>
            <nav className='main-nav-bar '>
              <ul>
                {pages && pages.map((page) => (
                  <li><Link to={`/${page.slug}`} className="nav-link">{ page.title.rendered }</Link></li>
                ))}
              </ul>
            </nav>
            <div className="page-content get-all-data">
              <Routes>
                <Route  path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> 
                {pages && pages.map((page, index) => (
                  <Route key={index} path={`/${page.slug}`} element={<div><h1>{ page.title.rendered }</h1>{parse(page.content.rendered)}</div>} />
                ))}
              </Routes>
            </div>
          </div>
        </div>
        
        <footer className="app-footer">
          <p>This is a footer.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
