import React, {useEffect, useState} from "react";
import logo from '../images/logo.svg';
import {  Link } from 'react-router-dom';

function Header () {
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
        <>
        <header className="site-header">
            <div className="header-custom">
                <div className="container">
                    <div className="row header-row">
                        <div className="logo-box">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <div className="nav-list">
                            <nav className='main-nav-bar'>
                                <ul>
                                    
                                    {pages && pages.map((page) => (
                                    <li><Link to={`/${page.slug}`} className="nav-link">{ page.title.rendered }</Link></li>
                                    ))}
                                    <li><Link to="/about" className="nav-link">About</Link></li>
                                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                                    <li><Link to="/" className="nav-link">Login</Link></li>
                                    
                                </ul>
                            </nav>
                            
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}
export default Header