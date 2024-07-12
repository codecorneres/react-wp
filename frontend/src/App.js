import React, {useState,useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './css/custom.css'; 
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import parse from 'react-html-parser';
//import { parse } from "@wordpress/block-serialization-default-parser";
//import './css/wp.css';
// import { __ } from '@wordpress/i18n';
// import { registerBlockType } from '@wordpress/blocks';
// import { useBlockProps } from '@wordpress/block-editor';
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";
import "@wordpress/blocks";
import "@wordpress/components";
import "@wordpress/data";
import "@wordpress/element";
import "@wordpress/block-editor";
import "@wordpress/i18n";


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

        <Header />
        
        <main className='body main-page-content'>
              <Routes>
                <Route  path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> 
                {pages && pages.map((page, index) => (
                  
                <Route 
                    key={index} 
                    path={`/${page.slug}`} 
                    element={
                      <div className='wp-page-content'>
                        <div className='container'>
                          <div className='wp-page-title'>
                            <h1 className='text-2xl font-bold'>
                              { page.title.rendered }
                            </h1>
                          </div>
                          <div className='wp-content'>
                            {parse(page.content.rendered)}
                          </div>
                        </div>
                      </div>
                } />
                  // <div className='wp-content' dangerouslySetInnerHTML={{__html: page.content.rendered}}></div>
                ))}
              </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
