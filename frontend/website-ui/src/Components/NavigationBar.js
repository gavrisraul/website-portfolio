import React from 'react';
import { Link } from 'react-router-dom';


class NavigationBar extends React.Component {
    state = {
        homeActive: window.location.href.includes('/') ? true : false,
        aboutActive: window.location.href.includes('/about') ? true : false,
        portfolioActive: window.location.href.includes('/portfolio') ? true : false,
        blogActive: window.location.href.includes('/blog') ? true : false,
        contactActive: window.location.href.includes('/contact') ? true : false,
    }

    render() {
        return (
            <nav className="nav-bar">
                <div className="link-nav inactive"> <Link to="/">Home</Link> </div>
                <div className={ this.state.aboutActive ? "link-nav active" : "link-nav inactive" } ><Link to="/about">About</Link ></div>
                <div className={ this.state.blogActive ? "link-nav active" : "link-nav inactive" } ><Link to="/blog">Blog</Link> </div>
                <div className={ this.state.portfolioActive ? "link-nav active" : "link-nav inactive" } ><Link to="/portfolio">Portfolio</Link> </div>
                <div className={ this.state.contactActive ? "link-nav active" : "link-nav inactive" } ><Link to="/contact">Contact</Link> </div>
            </nav>
        );
    };
}

export default NavigationBar;
